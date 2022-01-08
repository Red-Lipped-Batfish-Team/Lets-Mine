import React, { useState, useEffect } from "react";
import Card from "./Card";

const Item = ({ props }) => {
  const { id, model, quantity, duration, hashrate_id } = props;
  const [cartItems, setCartItems] = useState([]);
  return (
    <>
      <Card
        props={{
          model: model,
          quantity: quantity,
          duration: duration,
          size: "30rem",
          id: id,
          hashrate_id: hashrate_id,
          cartItems: cartItems,
          setCartItems: setCartItems,
        }}
      />
    </>
  );
};

export default Item;
