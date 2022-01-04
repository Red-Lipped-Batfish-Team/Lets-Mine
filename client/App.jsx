import React from "react";
// import "./App.css";
// import Home from "./pages";
// import About from "./pages/about";
// import Contact from "./pages/contact";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MarketContainer from "./routes/MarketPage";
import LoginPage from "./routes/LoginPage";
import SignupPage from "./routes/SignupPage";

const App = () => {
  return (
    <Router>
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
