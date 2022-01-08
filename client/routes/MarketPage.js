import React, { useState, useEffect } from "react";
import Item from "../components/Item";
import axios from "axios";
import { CssBaseline, Grid, Container, Typography } from "@material-ui/core";

const MarketContainer = () => {
  const [fetching, setFetching] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      setFetching(true);
      const items = await axios.get("/api/items").then((res) => res.data.items);
      setItems(items);
      setFetching(false);
    };

    getItems();
  }, []);

  return (
    <>
      <div style={{ paddingTop: 20 }}>
        <CssBaseline />
        <Grid container spacing={2}>
          {fetching ? (
            <Container>
              <Typography variant='h3' align="center" color="textPrimary">
                Fetching...
              </Typography>
            </Container>
          ) : (
            items.map((item, idx) => (
              <Grid item sx={12} s={6} md={4} lg={3}>
                <Item key={idx} props={item} />
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </>
  );
};

export default MarketContainer;
