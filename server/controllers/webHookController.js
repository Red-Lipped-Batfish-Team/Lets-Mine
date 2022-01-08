require("dotenv").config();
const db = require("../models/db");

const stripeAPI = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const webHookController = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = await stripeAPI.webhooks.constructEvent(
      req["rawBody"],
      sig,
      process.env.WEB_HOOK_SECRET
    );
  } catch (error) {
    return res.status(400), send(`webhook error: ${error}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.client_reference_id;
    console.log('!!! Returned userID: ', userId);

    const queryUserCarts = async () => {
      try {
        const queryAllCarts = `
        SELECT * FROM cart WHERE borrower_id = '${userId}'
        `;
        const res = await db.query(queryAllCarts);
        const carts = res.rows;
        console.log('!!! These are the carts to handle: ', carts);

        // MAKE TRANSACTION
        carts.forEach( async (cart) => {
          // Deconstruct the cart properties
          const { id : cart_id, borrower_id, item_id, quantity : quantityRequested, rental_duration, amount, expired } = cart;
          // Set new duration
          let date = new Date();
          let duration = date.setDate(date.getDate() + cart.rental_duration);
          let due = new Date(duration).toISOString();

          // Defining quantityAvailable...
          const getItemQuantity = `
          SELECT quantity 
          FROM item 
          Where id = ${item_id}
          `
          const quantityAvailable = await db.query(getItemQuantity);

          // START TRANSACTION
          try {
            // Params
            const transactionParams = [borrower_id, item_id, quantityRequested, due, amount ];

            if(quantityAvailable.rows[0].quantity < quantityRequested) {
            throw new Error(`Quantity requested is not available!`);
            }
            // End - quantity Check

            const query = `
            INSERT INTO transaction (borrower_id, item_id, quantity, due, amount)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
            `;

            const transaction = await db.query(query, transactionParams);
            console.log('Transaction Post Completed. Transaction id: ', transaction.rows[0].id);
          } catch (err) {
            throw new Error(`Transaction from the webhook failed. ERROR: ${err}`)
          }
          
          // UPDATE ITEM TABLE
          try {
            // Create new quantity
            const newQuantity = quantityAvailable.rows[0].quantity - quantityRequested;
        
            // Add adjusted quantity to setValue
            let setValue = `quantity = '${newQuantity}'`;
            setValue = setValue.replace(/(,\s$)/g, "");
        
            const query = `
            UPDATE item
            SET ${setValue}
            WHERE id = ${item_id}
            RETURNING id
            `;
          
            const item = await db.query(query);
        
            // if (item.rows.length === 0) {
            //   throw new Error(`No item with id of ${itemId} found!`);
            // }
            console.log(`Item quantity updated. Item: ${item.rows[0].id} was before ${quantityAvailable.rows[0].quantity} and is now ${newQuantity} (or ${quantityAvailable.rows[0].quantity} - ${quantityRequested}(quantity requested))`);
          } catch(err) {
            throw new Error(`Updating item in the webhook failed. ERROR: ${err}`)
          }

          // DELETE CARTS
          try {
            const deleteQuery = `
              DELETE FROM cart WHERE id = ${cart_id}
              RETURNING id
              `;
              const cartDelete = await db.query(deleteQuery)
              console.log(`Cart ID: ${cart_id} has been deleted. `);
          } catch(err) {
            throw new Error(`Deleting cart in the webhook failed. ERROR: ${err}`)
          }

        }) // carts.forEach End
 
      } catch(err) {
        throw new Error(`Error occurred in Webhooks - queryUserCarts. ERROR: ${err}.`);
      }
    }
    
    queryUserCarts();
  } // End if statement
  
}; // End Webhook

module.exports = webHookController;
