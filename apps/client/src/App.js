import './App.css';

import Navbar from './Components/Navbar/Navbar.jsx';
import Landing from './Components/Landing/Landing.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Wraper from './Components/Wraper/Wraper.jsx';
import Form from './Components/Form/Form.jsx';
import Detail from './Components/Detail/Detail.jsx';

import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getAllDogs from './Redux/actions/dogs/getAllDogs';
import getAllTemps from './Redux/actions/temperaments/getAllTemps';
import getDogById from './Redux/actions/dogs/getDogById';

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    dispatch(getAllTemps());
    dispatch(getAllDogs());
  }, [dispatch]);

  if (pathname.includes('/dogs/')) {
    const id = pathname.slice(6);
    dispatch(getDogById(id));
  }

  return (
    <div className="app">
      {pathname !== '/' ? <Navbar /> : ''}
      <Routes>
        <Route path='/dogs' element={<Wraper />} />
        <Route path='/dogs/:id' element={<Detail />} />
        <Route path='/new' element={<Form />} />
        <Route path='/' element={<Landing />} />
      </Routes>
      {pathname !== '/' ? <Footer /> : ''}

    </div>
  );
}