import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Report from "./pages/Report";
import NearestSafeLocs from "./pages/NearestSafeLocs";
import Announcements from "./pages/Announcements";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/sign-in" element={<Signin/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/report" element={<Report/>} />
          <Route path="/announcements" element={<Announcements/>} />
          <Route path="/safe-loc" element={<NearestSafeLocs/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
