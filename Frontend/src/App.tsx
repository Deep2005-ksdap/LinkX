// import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterationPage from "./pages/RegisterationPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
  // const apiCall = async () => {
  //   const res = await fetch("http://localhost:3000/shortURL", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       fullUrl: "https://google.com",
  //     }),
  //   });

  //   const data = await res.json();
  //   console.log(data);
  // };
  // useEffect(() => {
  //   apiCall();
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterationPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
