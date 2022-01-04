import React from 'react'
//import icons minus, plus, and trash icon
//style with actions casrds from mui

const CartItem = (product) => {


    //item id
    //increase button would update the cart by searching by item id in cart id
      //update the quantity of that item
      //

    // const {title, imageURl, price, quantity} = products
    return (
      <div>
        <div>Image goes here</div>
        <div>Title and Price</div>
        <div>quanitiy</div>
            <div>button group
                add Button
                conditional js for rendering the trash button(if == 1)
                if greater than 1 then shgow minus button
        </div>
      </div>
    );
}

export default CartItem
