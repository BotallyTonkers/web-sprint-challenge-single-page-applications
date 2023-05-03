import React from "react";
import "../../src/App.css";
import { useNavigate } from 'react-router-dom';
import { } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()

    const eatPizza = () => {
        navigate.push("PizzaForm")
    }
    <div>
        <button id ="order-pizza" onClick={eatPizza} >Order Pizza</button>
    </div>
}

export default Home;
