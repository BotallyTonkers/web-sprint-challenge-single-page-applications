import React from "react";
import "../../src/App.css";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()

    const eatPizza = () => {
        console.log('Ordering...')
        navigate.push('PizzaForm')
    }
    return (
    <div className="home-wrapper">
        <img
        className="home-image"
        src="https://pbs.twimg.com/media/EU-pgP9WAAIzw-_.jpg"
        alt="raccoon eating pizza"
        />
        <button id ="order-pizza" onClick={eatPizza} >Order Pizza</button>
    </div>
    )
}

