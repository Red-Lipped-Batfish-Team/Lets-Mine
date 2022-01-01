import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MarketContainer from "./routes/MarketPage";
import Counter from "./components/Counter";
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
                <Counter />
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
