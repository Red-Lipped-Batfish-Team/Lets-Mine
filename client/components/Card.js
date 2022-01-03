import React from "react";
import { Button } from "@material-ui/core";
/**
 *
 * @param {Object} props
 * @param {String} props.header
 * @param {String} props.body
 * @param {String} props.size
 */
const Card = ({ props }) => {
  const { header, body, size } = props;

  return (
    <>
      <div className="card bg-dark mt-3 mb-3" style={{ maxWidth: size }}>
        <h4 className="card-header text-light">{header}</h4>
        <div className="card-body text-light">{body}</div>
        <Button variant="contained"> Add</Button>
      </div>
    </>
  );
};

export default Card;
