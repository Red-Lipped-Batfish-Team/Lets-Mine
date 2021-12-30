import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const LoginPage = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setPassError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPassError(true);
    }
    if (email && password) {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const result = await axios.post(
          "http://localhost:5000/api/users/login",
          {
            email,
            password,
          },
          headers
        );

        navigate("/secret");
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/secret");
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
                Login
              </Typography>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                className={classes.field}
                color="secondary"
                variant="outlined"
                label="Email"
                required
                fullWidth
                error={emailError}
              />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                className={classes.field}
                color="secondary"
                variant="outlined"
                label="Password"
                required
                fullWidth
                error={passError}
              />

              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
              <br />
              <br />
              <Link to="/">Signup</Link>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LoginPage;
