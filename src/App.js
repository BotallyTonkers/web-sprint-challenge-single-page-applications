import React from "react";
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import PizzaForm from './Components/PizzaForm';
import Home from './Components/Home';


function App() {

  return (
   <div>
    <nav>
        <h1 className='order-pizza'>Amanda's Pizza</h1>
        <div className='nav-links'>
          <Link to='/'>Home</Link>
          <Link to='/pizza'>Order Pizza</Link>
        </div>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/pizza" element={<PizzaForm />} />
    </Routes>
   </div>
  );
};
export default App;