import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Item from "../components/Item";
import axios from "axios";
import getUserId from "../snippets/getUserId";
import { Button } from "@material-ui/core";

const SellerPage = () => {
  const [fetching, setFetching] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      setFetching(true);
      const userId = await getUserId();
      const userItem = await axios
        .get(`/api/items/user/${userId}`)
        .then((res) => res.data.userItem);
      setItems(userItem);
      setFetching(false);
    };

    getItems();
  }, []);

  return (
    <>
      <Link to='/sellerform'>
        <div>
          <Button>Add Item</Button>
        </div>
      </Link>

      {fetching ? (
        <h4>Fetching..</h4>
      ) : (
        items.map((item, idx) => <Item key={idx} props={item} />)
      )}
    </>
  );
};

export default SellerPage;
