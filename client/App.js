import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MarketContainer from "./routes/MarketPage";
import LoginPage from "./routes/LoginPage";
import SignupPage from "./routes/SignupPage";
import CartPage from "./routes/CartPage";
import Checkout from "./routes/Checkout";
import SuccessPage from "./routes/SuccessPage";
import CanceledPage from "./routes/CanceledPage";
import SellerPage from "./routes/SellerPage";
import SellerForm from "./routes/SellerForm";
import HomePage from "./routes/HomePage";
import AboutPage from "./routes/AboutPage";
import ContactPage from "./routes/ContactPage";
import { useDispatch } from "react-redux";
import getUserId from "./snippets/getUserId";
import { setUser } from "./features/user/userSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const userId = await getUserId();
      if (userId) {
        dispatch(setUser(true));
      }
    };
    getUser();
  },[]);

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/marketplace" element={<MarketContainer />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/seller" element={<SellerPage />}></Route>
          <Route path="/sellerform" element={<SellerForm />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/success" element={<SuccessPage />}></Route>
          <Route path="/canceled" element={<CanceledPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
