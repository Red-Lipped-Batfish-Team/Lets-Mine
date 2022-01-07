import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import axios from "axios";
import getUserId from "../snippets/getUserId";
import Checkout from "./Checkout";
import { useDispatch, useSelector } from "react-redux";
import { updateTotal, resetTotal } from "../features/cart/cartSlice";

const CartPage = () => {
  //api request to get the cart id or check cart state
  // const cart = [2, 2, 2, 2];
  const [carts, setCarts] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [update, setUpdate] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getCarts = async () => {
      setFetching(true);
      const userId = await getUserId();

      const res = await axios.get(`/api/carts/user/${userId}`);
      // dispatch(resetTotal);
      const cart = res.data.userCart;
      console.log(cart);
      cart.map((elem) => {
        dispatch(
          updateTotal({
            duration: elem.rental_duration,
            quantity: elem.quantity,
            price: elem.amount,
          })
        );
      });

      setCarts(cart);
      setFetching(false);
    };
    getCarts();
  }, []);

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
              setUpdate={setUpdate}
              // cartItemDuration={cartItemDuration}
              // cartItemQuantity={cartItemQuantity}
              // cartItemTotalPrice={cartItemTotalPrice}
              // setCartItemDuration={setCartItemDuration}
              // setCartItemQuantity={setCartItemQuantity}
              // setCartItemTotalPrice={setCartItemTotalPrice}
            />
          ))
        ) : (
          <h4>Cart is empty...</h4>
        )}

        {carts.length !== 0 && <Checkout carts={carts} />}
      </div>
    </>
  );
};

export default CartPage;
