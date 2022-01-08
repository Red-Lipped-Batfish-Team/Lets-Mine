import React, { useState, useEffect, useNavigate } from "react";
import { Link } from "react-router-dom";
// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
import {
  Button,
  Typography,
} from "@material-ui/core";

const SuccessPage = () => {

  //useEffect
  //create transaction
  //update item inventory
  //delete cart

  // const [sessionT, getSession] = useState({});
  // const [customerT, getCustoemr] = useState({});

  // useEffect(() => {
  //   // const getStripeInfo = async () => {
  //   //   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  //   //   const customer = await stripe.customers.retrieve(session.customer);
  //   // }
  // }, [])


  return (
     <div
     style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        }}>
       <Typography
       variant="h1"
       color="primary"
       align="center"
       >
       </Typography>
       Thank You For Your Purchase
       <Typography
       variant="h1"
       color="primary"
       align="center"
       variant="outlined"
       >
      <Button component={Link} to="/marketplace" color="primary">
       Continue Shopping
      </Button>
       </Typography>
     </div> 
  )
};

export default SuccessPage;
