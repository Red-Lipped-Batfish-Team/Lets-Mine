import React from "react";
import { AppBar, Typography, Toolbar, Button, IconButton, Badge } from "@material-ui/core";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { makeStyles } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  link: {
    color: "#fafafa",
    textDecoration: "none",
  },
  authButton: {
    color: "inherit",
  },
});

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSignOut = () => {
    //signout user
    //clear lcoal storage

    //redirect to homepage
    navigate("/");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.root} variant="h4">
            <Link className={classes.link} to="/">
              Scratch
            </Link>
          </Typography>
          <Typography className={classes.root} variant="h6">
            searchbar
          </Typography>
          <IconButton color="inherit" onClick={() => navigate("/checkout")}>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>

          <Button color="inherit" onClick={handleSignOut}>
            signout
          </Button>
          <Button color="inherit" onClick={handleSignOut}>
            <Link className={classes.link} to="/signin">
              signin
            </Link>
          </Button>
          <Button color="inherit" onClick={handleSignOut}>
            <Link className={classes.link} to="/signup">
              signup
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
