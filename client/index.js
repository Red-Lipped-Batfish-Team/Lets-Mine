import React from "react";
import { render } from "react-dom";
import App from "./App.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import store from './app/store';
import { Provider } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  'pk_test_51KC8mzI0zAlT8SZv0MYB0RCQFDqoZjdpTsyvXwrBEqTW7Q4Tm0hnqcmz1U5j1wnvK1Oah1FTPLfNDyIB2b0v7XZI00eNMMX2nK'
);

render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </Provider>,
  document.getElementById("root")
);
