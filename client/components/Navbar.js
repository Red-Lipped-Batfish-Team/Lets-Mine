import React, { useState, useEffect } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavBarElements";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../features/user/userSlice";
//import logo from '../images/redlipfish.jpg';
//import logo from '../images/redlipfish.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleSignOut = () => {
    // dispatch(clearToken);
    sessionStorage.clear();
    dispatch(clearUser(false));
  };

  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>Logo</h1>
          {/* <img src={require('../images/redlipfish.png')} 
          alt="logo"/> */}
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          <NavLink to="/contact" activeStyle>
            Contact Us
          </NavLink>

          {user && (
            <NavLink to="/marketplace" activeStyle>
              Buy
            </NavLink>
          )}

          {user && (
            <NavLink to="/seller" activeStyle>
              Sell
            </NavLink>
          )}
          <NavLink to="/cart" activeStyle>
            Cart
          </NavLink>

          {user ? (
              <></>
          ): (
            <NavLink to="/login" activeStyle>
            Login
          </NavLink>
          )}

          {user ? (
            <NavBtnLink to="/" onClick={handleSignOut} activeStyle>
              Sign out
            </NavBtnLink>
          ) : (
            <NavBtnLink to="/signup">Sign Up</NavBtnLink>
          )}
        
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
