import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UrlProvider } from "./context/UrlContext";
import { AnalyticsProvider } from "./context/AnalyticsContext";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UrlProvider>
          <AnalyticsProvider>
            <ToastContainer position="top-right" autoClose={2000} theme="dark" />
            <App />
          </AnalyticsProvider>
        </UrlProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
