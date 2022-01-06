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

    let carts = [];

    const queryUserCarts = async () => {
      try {
        const queryAllCarts = `
        SELECT * FROM cart WHERE borrower_id = '${userId}'
        `;
        const res = await db.query(queryAllCarts);
        console.log('!!! Returned res: ', res);

        cart = res.rows;
      } catch(err) {
        throw new Error(`Error occurred in Webhooks db call for all carts. ERROR: ${err}.`);
      }
    }
    
    queryUserCarts();
    console.log('!!! Returned carts: ', carts);


  }
  


  // if (event.type === "checkout.session.completed") {
  //   const session = event.data.object;
  //   console.log('This is the session: ', session);
  //   console.log('This is the session.customer: ', session.client_reference_id);
    
  // }
};

module.exports = webHookController;
