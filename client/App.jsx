import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MarketContainer from "./containers/MarketContainer";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<h1>Hello World!!</h1>}></Route>
          <Route path="/marketplace" element={<MarketContainer />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
