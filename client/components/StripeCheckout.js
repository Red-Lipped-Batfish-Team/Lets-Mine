import React, {useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const StripeCheckout = ({}) => {
  const [email, setEmail] = useState("");
    const stripe = useStripe();
    
    //get cart & userId data from cartSlice
    const cartItems = [{title: 'item1', price: 100, quantity: 3, description: 'rig1', imageUrl:'blank'}]
    const userId = 2;


  const handleCheckout = async (e) => {
    e.preventDefault();

    // const response = await fetchFromAPI("create-checkout-session", {
    //   body: { line_items, customer_email: email },
    // });

    // const { sessionId } = response;
    // const { error } = await stripe.redirectToCheckout({
    //   sessionId,
    // });

    // if (error) {
    //   console.log(error);
    // }
    

    const line_items = cartItems.map((item) => {
      return {
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100, // amount is in cents
          product_data: {
            name: item.title,
            description: item.description,
            images: [item.imageUrl],
          },
        },
      };
    });

    try {
      const result = await axios.post("/api/carts/checkout", {
        line_items, customer_email: email, userId,
      });
      console.log(result.data);
      const { sessionId } = result.data;
      try {
        await stripe.redirectToCheckout({ sessionId });
      } catch (error) {
        console.log(`redirect failed: ${error}`);
      }
    } catch (error) {
      console.log(`api call failed: ${error}`);
    }
  };

  return (
    <form onSubmit={handleCheckout}>
      <div>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        />
      </div>
      <div>
        <button type="submit">
          Checkout
        </button>
      </div>
    </form>
  );
};

export default StripeCheckout;
