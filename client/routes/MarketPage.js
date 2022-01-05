import React, { useState, useEffect } from "react";
import Item from "../components/Item";
import axios from "axios";

const MarketContainer = () => {
  const [fetching, setFetching] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      setFetching(true);
      const items = await axios.get("/api/items").then((res) => res.data.items);
      console.log(items);
      setItems(items);
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

export default MarketContainer;
