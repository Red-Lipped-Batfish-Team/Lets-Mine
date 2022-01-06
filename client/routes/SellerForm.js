import React from "react";
import { useState } from "react";
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
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../features/authToken/tokenSlice";
import { setUser } from "../features/user/userSlice";

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
  const classes = useStyles();
  const navigate = useNavigate();
  //redirect user back to seller page

  const [hashrateId, setHashrateId] = useState("");
  const [model, setModel] = useState("");
  const [quantity, setQuantity] = useState("");
  const [modelError, setModelError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);



  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dupEmailMsg, setDupEmailMsg] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();


  const handleSellerSubmit = async (e) => {
    e.preventDefault();
    setModelError(false);
    setQuantityError(false);



  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirstNameError(false);
    setLastNameError(false);
    setAddressError(false);
    setEmailError(false);
    setPasswordError(false);

    if (firstName === "") {
      setFirstNameError(true);
    }
    if (lastName === "") {
      setLastNameError(true);
    }
    if (address === "") {
      setAddressError(true);
    }
    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }

    if (firstName && lastName && address && email && password) {
      const userPayload = {
        first_name: firstName,
        last_name: lastName,
        address,
        email,
        password,
      };

      const res = await axios.post("/api/users", userPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.userId) {
        const authPayload = {
          email,
          password,
        };

        const res = await axios.post("/auth", authPayload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.data.token) {
          dispatch(setToken(res.data.token));
          dispatch(setUser(true));
          navigate("/marketplace");
        }
      }

      if (
        res.data ===
        'duplicate key value violates unique constraint "email_unique"'
      ) {
        setDupEmailMsg("Email already exists!");
      }
    }
  };

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
                gutterBottom
              >
                Seller Form
              </Typography>
              <Select  
                onChange={(e) => setHashrateId(e.target.value)}
                className={classes.field}
                color="secondary"
                variant="outlined"
                value={hashrateId} displayEmpty
                required
                fullWidth>
               <MenuItem 
               required
               value="" disabled>Hash Rate</MenuItem>
               <MenuItem value={1}>Hashrate 1</MenuItem>
               <MenuItem value={2}>Hashrate 2</MenuItem>
               <MenuItem value={3}>Hashrate 3</MenuItem>
               <MenuItem value={4}>Hashrate 4</MenuItem>
               <MenuItem value={5}>Hashrate 5</MenuItem>
               <MenuItem value={6}>Hashrate 6</MenuItem>
              </Select>
              <TextField
                onChange={(e) => setModel=(e.target.value)}
                className={classes.field}
                color="secondary"
                variant="outlined"
                label="Model"
                required
                fullWidth
              />
              <TextField
                onChange={(e) => setAddress(e.target.value)}
                className={classes.field}
                color="secondary"
                variant="outlined"
                label="Quantity"
                required
                fullWidth
                error={addressError}
              />
              <span className="text-danger">{dupEmailMsg}</span>
        
              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SellerForm;
