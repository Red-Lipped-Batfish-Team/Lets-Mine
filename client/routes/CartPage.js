import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import CartTotal from "../components/CartTotal";
import axios from "axios";
import getUserId from "../snippets/getUserId";
import { Card, CardActionArea } from "@material-ui/core";
import Checkout from "./Checkout";

const CartPage = () => {
  //api request to get the cart id or check cart state
  // const cart = [2, 2, 2, 2];
  const [carts, setCarts] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const getTotals = () => {
    let quantity = 0;
    let price = 0;
    let duration = 0
    carts.map((elem) => {
      quantity += elem.quantity;
      price += elem.amount;
      duration += elem.rental_duration
    });
    setTotalPrice(price);
    setTotalQuantity(quantity);
    setTotalDuration(duration);
  };

  useEffect(() => {
    const getCarts = async () => {
      setFetching(true);
      const userId = await getUserId();

      const res = await axios.get(`/api/carts/user/${userId}`);

      const cart = res.data.userCart;
      setCarts(cart);
      setFetching(false);
    };
    getCarts();
  }, [totalDuration, totalQuantity]);
  /**
   * TODO: Render tems
   */
  // carts.map((item) => console.log(item));
  // carts.map((item, ind) => {
  //         <CartItem key={ind} item={item} />;
  //       })
  return (
    <>
      <div
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "top",
      //   height: "90vh",
      // }}
      >
        <h2>Cart</h2>

        {fetching ? (
          <h4>Fetching..</h4>
        ) : carts.length !== 0 ? (
          carts.map((item, idx) => (
            <CartItem
              key={idx}
              props={item}
              setTotalPrice={setTotalPrice}
              setTotalQuantity={setTotalQuantity}
              setTotalDuration={setTotalDuration}
              totalPrice={totalPrice}
              totalQuantity={totalQuantity}
              totalDuration={totalDuration}
            />
          ))
        ) : (
          <h4>Cart is empty...</h4>
        )}

        {carts.length !== 0 && (
          <Checkout
            getTotals={getTotals}
            totalPrice={totalPrice}
            totalQuantity={totalQuantity}
            totalDuration={totalDuration}
            carts={carts}
          />
        )}
      </div>
    </>
  );
};

export default CartPage;
