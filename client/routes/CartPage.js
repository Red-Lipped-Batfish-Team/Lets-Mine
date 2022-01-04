import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import CartTotal from "../components/CartTotal";
import axios from "axios";
import getUserId from "../snippets/getUserId";

const CartPage = () => {
  //api request to get the cart id or check cart state
  const cart = [2, 2, 2, 2];
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const userId = await getUserId();
      console.log(userId);
      const carts = await axios.get("/api/carts").then((res) => res.data.carts);

      setItems(carts);
    };

    getItems();
  }, []);

  return (
    <div>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <div>"cart is empty"</div>
      ) : (
        <>
          <div>
            <div>
              <CartItem />
            </div>
            <CartTotal />
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
