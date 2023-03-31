import './App.css';

import Navbar from './Components/Navbar/Navbar.jsx';
import Landing from './Components/Landing/Landing.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Wraper from './Components/Wraper/Wraper.jsx';

import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dogs' element={<Wraper />} />
      </Routes>

      <Footer />
    </div>
  );
}