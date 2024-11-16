import "./App.css";

import Navbar from "./Components/Navbar/Navbar.jsx";
import Landing from "./Components/Landing/Landing.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Wraper from "./Components/Wraper/Wraper.jsx";
import Form from "./Components/Form/Form.jsx";
import Detail from "./Components/Detail/Detail.jsx";
import Error from "./Components/Error/Error.jsx";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./Redux/hooks.js";
import getAllDogs from "./Redux/actions/dogs/getAllDogs";
import getAllTemps from "./Redux/actions/temperaments/getAllTemps";
import getDogById from "./Redux/actions/dogs/getDogById";
import toggleFetching from "./Redux/actions/dogs/toggleFetching";

export default function App() {
  const dispatch = useAppDispatch();
  const allDogs = useAppSelector((state) => state.allDogs);
  const allTemps = useAppSelector((state) => state.allTemps);
  const fetching = useAppSelector((state) => state.fetching);
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const headlessPaths = ["/", "/error"];

  useEffect(() => {
    if (!fetching) {
      if (!allDogs.length) {
        dispatch(toggleFetching());
        dispatch(getAllDogs())
          .then(() => {
            dispatch(toggleFetching());
          })
          .catch((e) => {
            if (e.response.status === 400) {
              navigate("/error");
            }
          });
      }
      if (!allTemps.length) {
        dispatch(getAllTemps());
      }
    }
    if (pathname.includes("/dogs/")) {
      const id = pathname.slice(6);
      dispatch(getDogById(id));
    }
  }, [dispatch, location, allDogs.length, allTemps.length]);

  return (
    <div className={`app ${pathname === "/" ? "landing" : ""}`}>
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
