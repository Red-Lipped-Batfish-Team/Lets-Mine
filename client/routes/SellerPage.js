import React, { useState, useEffect } from "react";
import Item from "../components/Item";
import axios from "axios";
import getUserId from "../snippets/getUserId";

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
      {fetching ? (
        <h4>Fetching..</h4>
      ) : (
        items.map((item, idx) => <Item key={idx} props={item} />)
      )}
    </>
  );
};

export default SellerPage;
