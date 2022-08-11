import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import App from "./App";

import AuthProvider from "./context/AuthProvider";
import SnackbarProvider from "./context/SnackbarProvider";
import LoaderProvider from "./context/LoaderProvider";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <AuthProvider>
          <LoaderProvider>
            <App />
          </LoaderProvider>
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
