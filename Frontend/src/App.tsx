// import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterationPage from "./pages/RegisterationPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import LinkAnalytics from "./pages/LinkAnalytics";
import AnalyticsPage from "./pages/AnalyticsPage";
import Layout from "./pages/Layout";

type Theme = "light" | "dark";

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) ?? "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage theme={theme} setTheme={setTheme} />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterationPage />} />
      <Route
        path="/dashboard"
        element={<Layout theme={theme} setTheme={setTheme} />}
      >
        <Route index element={<Dashboard />} />
        <Route path="analytics/:shortID" element={<LinkAnalytics />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
