import React from 'react'
import StripeCheckout from '../components/StripeCheckout';

const Checkout = () => {
    //get item count and cart total

    return (
      <div>
        <h2>Checkout Summary </h2>
        <h3>Total Items: 0</h3>
        <h3>Price: $0</h3>
        <StripeCheckout />
      </div>
    );
}

export default Checkout
