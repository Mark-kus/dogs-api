import './App.css';

import Navbar from './Components/Navbar/Navbar.jsx';
import Landing from './Components/Landing/Landing.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Wraper from './Components/Wraper/Wraper.jsx';
import Form from './Components/Form/Form.jsx';
import Detail from './Components/Detail/Detail.jsx';

import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './Redux/hooks.js'
import getAllDogs from './Redux/actions/dogs/getAllDogs';
import getAllTemps from './Redux/actions/temperaments/getAllTemps';
import getDogById from './Redux/actions/dogs/getDogById';

export default function App() {
  const dispatch = useAppDispatch();
  const {allDogs, allTemps} = useAppSelector(state => state);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (!allDogs.length) dispatch(getAllTemps());
    if (!allTemps.length) dispatch(getAllDogs());
  }, [dispatch, location, allDogs.length, allTemps.length]);

  if (pathname.includes('/dogs/')) {
    const id = pathname.slice(6);
    dispatch(getDogById(id));
  }

  return (
    <div className={`app ${pathname === '/' ? 'landing' : ''}`}>
      {pathname !== '/' && <Navbar />}
      <Routes>
        <Route path='/dogs' element={<Wraper />} />
        <Route path='/dogs/:id' element={<Detail />} />
        <Route path='/new' element={<Form />} />
        <Route path='/' element={<Landing />} />
      </Routes>
      {pathname !== '/' && <Footer />}
    </div>
  );
}