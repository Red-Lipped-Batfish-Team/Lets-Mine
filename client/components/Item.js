import React from "react";
import Card from "./Card";

const Item = ({ props }) => {
  const { id, model, quantity, duration, hashrate_id } = props;
  return (
    <>
      <Card
        props={{
          header: model,
          quantity: quantity,
          duration: duration,
          size: "30rem",
          id: id,
          hashrate_id: hashrate_id
        }}
      />
    </>
  );
};

export default Item;
