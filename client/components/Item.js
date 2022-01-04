import React from "react";
import Card from "./Card";

const Item = ({ props }) => {
  const { id, model, quantity, duration } = props;
  return (
    <>
      <Card
        props={{
          header: model,
          quantity: quantity,
          duration: duration,
          size: "30rem",
          id: id,
        }}
      />
    </>
  );
};

export default Item;
