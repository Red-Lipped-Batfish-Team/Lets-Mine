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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../features/authToken/tokenSlice";

//import icons

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

const SignupPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dupEmailMsg, setDupEmailMsg] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();

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
                Signup
              </Typography>
              <TextField
                onChange={(e) => setFirstName(e.target.value)}
                className={classes.field}
                color="secondary"
                variant="outlined"
                label="First Name"
                required
                fullWidth
                error={firstNameError}
              />
              <TextField
                onChange={(e) => setLastName(e.target.value)}
                className={classes.field}
                color="secondary"
                variant="outlined"
                label="Last Name"
                required
                fullWidth
                error={lastNameError}
              />
              <TextField
                onChange={(e) => setAddress(e.target.value)}
                className={classes.field}
                color="secondary"
                variant="outlined"
                label="Address"
                required
                fullWidth
                error={addressError}
              />
              <TextField
                onChange={(e) => {
                  {
                    setEmail(e.target.value);
                    setDupEmailMsg("");
                  }
                }}
                className={classes.field}
                color="secondary"
                variant="outlined"
                label="Email"
                required
                fullWidth
                error={emailError}
              />
              <span className="text-danger">{dupEmailMsg}</span>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                className={classes.field}
                color="secondary"
                variant="outlined"
                label="Password"
                required
                fullWidth
                error={passwordError}
              />

              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>

              <br />
              <br />
              <Link to="/login">Login</Link>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignupPage;
