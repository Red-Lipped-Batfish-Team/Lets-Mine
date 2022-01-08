import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  TextField,
  Grid,
  Paper,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useDispatch } from "react-redux";
import getUserId from "../snippets/getUserId";

const useStyles = makeStyles({
  paperStyle: {
    padding: 20,
    minheight: "50vh",
    minWidth: "350px",
    margin: "5% auto",
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});


const SellerForm = () => {
  const [hashrateData, setHashrateData] = useState([]);
  const [hashrate_id, setHashrateId] = useState("");
  const [model, setModel] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [duration, setDuration] = useState(0);
  const [modelError, setModelError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    const getHashRate = async () => {
      const hashRate = await axios.get("/api/hashrates");
      setHashrateData(hashRate.data.hashrates);
    };
    getHashRate();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModelError(false);
    setQuantityError(false);

    if (model === "") {
      setModelError(true);
    }
    if (quantity === "") {
      setQuantityError(true);
    }
    if (duration === "") {
      setDurationError(true);
    }
    
    if (hashrate_id && model && quantity && duration) {
      const userId = await getUserId();
      const userPayload = {
        lender_id: userId,
        hashrate_id,
        model,
        quantity,
        duration,
      };
      const res = await axios.post("/api/items", userPayload, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      }
      setModel('');
      setQuantity(0);
      setDuration(0);
      navigate("/seller")
    }

  return (
    <Container>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container>
          <Grid item>
            <Paper className={classes.paperStyle} elevation={10}>
              <Typography
                variant="h6"
                color="textPrimary"
                component="h2"
                gutterBottom>
                Seller Form
              </Typography>
              <Select
                onChange={(e) => setHashrateId(e.target.value)}
                className={classes.field}
                color="secondary"
                variant="outlined"
                value={hashrate_id} displayEmpty
                required
                fullWidth>
                <MenuItem required value="" disabled>
                  Hash Rate *
                </MenuItem>
                {hashrateData.map((ele, idx) => (
                  <MenuItem value={idx}>{ele.hashrate_tier}</MenuItem>
                ))}
              </Select>
              <TextField
                onChange={(e) => setModel(e.target.value)}
                className={classes.field}
                color="secondary"
                variant="outlined"
                label="Model"
                required
                fullWidth
                error={modelError}
              />
              <TextField
                onChange={(e) => setQuantity(Number(e.target.value))}
                className={classes.field}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
                color="secondary"
                variant="outlined"
                label="Quantity"
                required
                fullWidth
                error={quantityError}
              />
                <TextField
                onChange={(e) => setDuration(Number(e.target.value))}
                className={classes.field}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
                color="secondary"
                variant="outlined"
                label="Duration"
                required
                fullWidth
                error={durationError}
              />
              <Button type="submit" color="primary" variant="contained">
                Submit Item
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SellerForm;
