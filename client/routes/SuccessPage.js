import React, { useState, useEffect, useNavigate } from "react";
// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const SuccessPage = () => {
  //useEffect
  //create transaction
  //update item inventory
  //delete cart

  const [sessionT, getSession] = useState({});
  const [customerT, getCustoemr] = useState({});

  useEffect(() => {
    // const getStripeInfo = async () => {
    //   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    //   const customer = await stripe.customers.retrieve(session.customer);
    // }
  }, [])


  return (
  <div>Order confirmation page insert "continue Shopping" button
    <p>Thanks for your order, 
      {/* {customer.name} */}
      !</p>
  </div>
  )
};

export default SuccessPage;
