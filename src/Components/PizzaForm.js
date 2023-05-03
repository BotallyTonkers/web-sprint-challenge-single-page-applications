

import React, { useState } from 'react';
import axios from 'axios';



const initialFormValues = {
    size: '',
    sauce: '',
    cheese: false,
    pepperoni: false,
    anchovies: false,
    sausage: false,
    mushrooms: false,
    peppers: false,
    specialInstructions:''
}

const initialPizzaOrder = []



function Form () {
    const [pizzaOrder, setPizzaOrder] = useState(initialPizzaOrder)
    const [formValues, setFormValues] = useState(initialFormValues) 

    const postNewOrder = newOrder => {
        axios.post('https://reqres.in/api/orders', newOrder)
        .then(res => {
            setPizzaOrder([...pizzaOrder, res.data])
            console.log(pizzaOrder)
        })
        .catch(err => {
            console.log(`NO PIZZA FOR YOU ${err}`)
        })
        setFormValues(initialFormValues)
    }





    const inputChange = (name, value) => {
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        inputChange(name, valueToUse)
    }

    const formSubmit = () => {
        const newPizzaOrder = {
            size: formValues.size,
            sauce: formValues.sauce.trim(),
            specialInstructions: formValues.specialInstructions.trim(),
            toppings: ['cheese', 'pepperoni', 'anchovies', 'sausage', 'mushrooms', 'peppers'].filter(topping => formValues[topping])
        }
        postNewOrder(newPizzaOrder)
    }

    const onSubmit = evt => {
        evt.preventDefault()
        formSubmit()
    }
    
    
    
   


    return (
        <div>
            <h3>Build Your Own Pizza!</h3>
            <form onSubmit={onSubmit} id='pizza-form'>
            <label>Name:
                     <input
                         type="text"
                         id="name-input"
                         name="name"
                         value={''}
                         onChange={onChange}
                      />
                </label>
                <label>Choice Of Size
                <div>
             <select id="size-dropdown" name="size" onChange={onChange}>
                 <option value="">Select Size</option>
                 <option value="s">Smallboi</option>
                 <option value="m">Mediumboi</option>
                 <option value="l">Largboi</option>
             </select>
             </div>
                </label>
            
            <h3>Add Toppings</h3>
                <label>Cheese
                    <input 
                    type='checkbox'
                    name='cheese'
                    checked={formValues.cheese}
                    onChange={onChange}
                    />
                </label>
        
                <label>Pepperoni
                    <input 
                    type='checkbox'
                    name='pepperoni'
                    checked={formValues.pepperoni}
                    onChange={onChange}
                    />
                </label>
        
                <label>Anchovies
                    <input 
                    type='checkbox'
                    name='anchovies'
                    checked={formValues.anchovies}
                    onChange={onChange}
                    />
                </label>
                <label>Sausage
                    <input 
                    type='checkbox'
                    name='sausage'
                    checked={formValues.sausage}
                    onChange={onChange}
                    />
                </label>
        
                <label>Mushrooms
                    <input 
                    type='checkbox'
                    name='mushrooms'
                    checked={formValues.mushrooms}
                    onChange={onChange}
                    />
                </label>
                <label>Peppers
                    <input 
                    type='checkbox'
                    name='peppers'
                    checked={formValues.peppers}
                    onChange={onChange}
                    />
                </label>
            <h3>Any Special Instructions?</h3>
                <input 
                    value={formValues.specialInstructions}
                    onChange={onChange}
                    name='specialInstructions'
                    id='special-text'
                    type='text'
                    />
                <br></br>
                <br></br>
            </form>
        </div>
    )
}

export default Form;