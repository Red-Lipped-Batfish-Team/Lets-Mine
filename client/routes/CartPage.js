import React, { useEffect, useState } from 'react'
import CartItem from '../components/CartItem'
import CartTotal from '../components/CartTotal'
import axios from 'axios';

const CartPage = () => {
  const [change, setChange] = useState(false);
  const token = sessionStorage.getItem(token);
  console.log(token);

  const getCartItems = async () => {
    console.log(token);
    const userId = await axios.post('auth/session', { token }, {headers: {'Content-Type' : 'application/json'}});
    setChange(true)
    console.log(userId)
  }
    //get the user id
  useEffect(() => {
    getCartItems();
  }, [change]);
    //api request to get the cart id 
    //iterate over items 
  
  
    const cart = [2,2,2,2]

    return (
      <div>
        <h1>Cart</h1>
        <h2>{token}</h2>
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
}

export default CartPage
