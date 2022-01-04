import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import MarketContainer from "./routes/MarketPage";
import LoginPage from "./routes/LoginPage";
import SignupPage from "./routes/SignupPage";
import CartPage from "./routes/CartPage";
import Checkout from "./components/Checkout";
import SuccessPage from "./routes/SuccessPage";
import CanceledPage from "./routes/CanceledPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Hello World!</h1>
              </>
            }
          ></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/marketplace" element={<MarketContainer />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/success" element={<SuccessPage />}></Route>
          <Route path="/canceled" element={<CanceledPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
