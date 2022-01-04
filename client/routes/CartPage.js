import React from 'react'
import CartItem from '../components/CartItem'
import CartTotal from '../components/CartTotal'

const CartPage = () => {
    //get the user id
    //api request to get the cart id 
    //iterate over items 
  
  
    const cart = [2,2,2,2]

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
}

export default CartPage
