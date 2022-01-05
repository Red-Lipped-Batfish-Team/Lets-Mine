import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import MarketContainer from "./routes/MarketPage";
import LoginPage from "./routes/LoginPage";
import SignupPage from "./routes/SignupPage";
import CartPage from "./routes/CartPage";
import Checkout from "./components/Checkout";
import SuccessPage from "./routes/SuccessPage";
import CanceledPage from "./routes/CanceledPage";
import SellerPage from "./routes/SellerPage";
import SellerForm from "./components/SellerForm";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          {/* <Route path='/' element={<HomePage />}></Route> */}
          {/* <Route path='/about' element={<AboutPage />}></Route> */}
          {/* <Route path='/contact' element={<ContactPage />}></Route> */}
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
