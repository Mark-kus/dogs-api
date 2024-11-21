import "./App.css";

import Navbar from "./Components/Navbar/Navbar.jsx";
import Landing from "./Components/Landing/Landing.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Wraper from "./Components/Wraper/Wraper.jsx";
import Form from "./Components/Form/Form.jsx";
import Detail from "./Components/Detail/Detail.jsx";
import Error from "./Components/Error/Error.jsx";

import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";

export default function App() {
  const location = useLocation();
  const { pathname } = location;

  const headlessPaths = ["/", "/error"];

  return (
    <div className={`app ${headlessPaths.includes(pathname) ? "landing" : ""}`}>
      {!headlessPaths.includes(pathname) && <Navbar />}
      <Routes>
        <Route path="/dogs" element={<Wraper />} />
        <Route path="/dogs/:id" element={<Detail />} />
        <Route path="/new" element={<Form />} />
        <Route path="/error" element={<Error />} />
        <Route path="/" element={<Landing />} />
      </Routes>
      {!headlessPaths.includes(pathname) && <Footer />}
    </div>
  );
}
