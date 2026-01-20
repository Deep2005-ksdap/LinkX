import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UrlProvider } from "./context/UrlContext";
import { AnalyticsProvider } from "./context/AnalyticsContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UrlProvider>
          <AnalyticsProvider>
            <App />
          </AnalyticsProvider>
        </UrlProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
