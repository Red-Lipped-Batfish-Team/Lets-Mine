import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MarketContainer from "./containers/MarketContainer";
import Counter from "./components/Counter";
import Navbar from "./components/Navbar";

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
                <Counter />
              </>
            }
          ></Route>
          <Route path="/marketplace" element={<MarketContainer />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
