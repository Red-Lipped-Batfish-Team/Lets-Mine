import React, { useState, useEffect } from "react";
import StripeCheckout from "../components/StripeCheckout";

const Checkout = ({ totalPrice, totalQuantity, getTotals }) => {
  //get item count and cart total
  useEffect(() => {
    getTotals()
  }, []);

  return (
    <div>
      <h2>Checkout Summary </h2>
      <h3>Total Items: {totalQuantity}</h3>
      <h3>Price: ${totalPrice}</h3>
      <StripeCheckout/>
    </div>
  );
};

export default Checkout;
