import React from "react";
import Card from "./Card";

const Item = ({ props }) => {
  const { model, quantity } = props;
  return (
    <>
      <Card
        props={{
          header: model,
          body: quantity,
          size: "30rem",
        }}
      />
    </>
  );
};

export default Item;
