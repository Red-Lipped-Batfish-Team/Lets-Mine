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
import { setToken } from "../features/authToken/tokenSlice";
import { setUser } from "../features/user/userSlice";
import getUserId from "../snippets/getUserId";

/**
 * api: Get hashrate -> /api/hashrates
 * api: Post item -> /api/items
 * Example body:
 * {
 *   "lender_id": 14,
 *   "hashrate_id": 2,
 *   "model": 3,
 *   "quantity": 5
 * }
 *
 */

const useStyles = makeStyles({
  //used to create diff styling for specific items
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
  const [lender_id, setLenderId] = useState("");
  const [model, setModel] = useState("");
  const [quantity, setQuantity] = useState("");
  const [modelError, setModelError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //redirect user back to seller page

  useEffect(() => {
    const getHashRate = async () => {
      const hashRate = await axios.get("/api/hashrates");
      console.log(hashRate);
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
    const userId = await getUserId();

    if (hashrate_id && model && quantity) {
      const userPayload = {
        lender_id: userId,
        hashrate_id,
        model,
        quantity,
      };
      const res = await axios.post("/api/items", userPayload, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (res.data.token) {
        dispatch(setToken(res.data.token));
        dispatch(setUser(true));
        navigate("/seller");
      }
      }
    }

  return (
    <Container>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container>
          <Grid item>
            <Paper className={classes.paperStyle} elevation={10}>
              <Typography
                variant="h6"
                color="textSecondary"
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
                onChange={(e) => setQuantity(e.target.value)}
                className={classes.field}
                color="secondary"
                variant="outlined"
                label="Quantity"
                required
                fullWidth
                error={quantityError}
              />
              <span className="text-danger">{}</span>

              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}


export default SellerForm;
