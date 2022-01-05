import React from "react";
import { Card, CardActionArea } from "@material-ui/core";
//import icons minus, plus, and trash icon

const CartItem = ({ item }) => {
  //item id
  //increase button would update the cart by searching by item id in cart id
  //update the quantity of that item
  //
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const getCarts = async () => {
      const userId = await getUserId();

      const res = await axios.get(`/api/carts/user/${userId}`);

      const cart = res.data.userCart;
      setCarts(cart);
    };

    getCarts();
  }, []);

  console.log(item);
  // const {title, imageURl, price, quantity} = products
  return <div></div>;
};

export default CartItem;
