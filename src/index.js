import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Footer from "./components/Footer";
import reportWebVitals from "./reportWebVitals";

import "./styles/fonts.css";
import "./styles/styles.css";

const root = ReactDOM.createRoot(document.querySelector("body"));
root.render(
  <React.StrictMode>
    <App />
    <Footer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
