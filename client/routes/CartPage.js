import React, { useState, useEffect, useRef } from "react";
import CartItem from "../components/CartItem";
import axios from "axios";
import getUserId from "../snippets/getUserId";
import getCoinPrice from "../snippets/getCoinPrice";
import Checkout from "./Checkout";
import { useDispatch, useSelector } from "react-redux";
import { updateTotal, resetTotal} from "../features/cart/cartSlice";

const CartPage = () => {
  //api request to get the cart id or check cart state
  // const cart = [2, 2, 2, 2];
  const [carts, setCarts] = useState([]);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCarts = async () => {
      setFetching(true);
      const userId = await getUserId();

      const res = await axios.get(`/api/carts/user/${userId}`);

      const cart = res.data.userCart;
      dispatch(resetTotal())
      cart.map(async (elem) => {
        const itemPrice = await getCoinPrice(elem.hashrate_id);
        dispatch(
          updateTotal({
            duration: elem.rental_duration,
            quantity: elem.quantity,
            price: itemPrice.toFixed(2),
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
              carts={carts}
              setCarts={setCarts}
            />
          ))
        ) : (
          <h4>Cart is empty...</h4>
        )}

        {carts.length !== 0 && <Checkout carts={carts} setCarts={setCarts} />}
      </div>
    </>
  );
};

export default CartPage;
