// import React, { useState } from "react";
// import axios from "axios";
// import * as yup from 'yup';

// const initialFormValues = {
//     name: '',
//     size: '',
//     pepperoni: false,
//     sausage: false,
//     mushroom: false,
//     anchovey: false,
//     text: ''
//   }

  
//   const initialFormErrors = {
//     name: '',
//     size: '',
//     pepperoni: '',
//     sausage: '',
//     mushroom: '',
//     anchovey: '',
//     text: ''
//   }

// const initialPizzaOrder = []

// const Form = () => {

//     const [formValues, setFormValues] = useState(initialFormValues);
//     const [formErrors, setFormErrors] = useState(initialFormErrors);
//     const [ pizzaOrder, setPizzaOrder] = useState(initialPizzaOrder);

//     const postNewOrder = formValues => {
//       axios.post('https://reqres.in/api/orders', formValues)
//       .then(res => {
//         setPizzaOrder([...pizzaOrder, res.data ])
//       })
//       .catch(err => {
//         console.log(err)
//       })
//     }
  
//     const validate = (name, value) => {
//       yup.reach( name)
//       .validate(value)
//       .then(() => setFormErrors({ ...formErrors, [name]: '' }))
//       .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
//     }
  
//     const handleChange = (name, value) => {
//       validate(name, value);
//       setFormValues({...formValues, [name]: value });
//     }

//     const onChange = (e) => {
//         const { name, value, checked, type } = e.target;
//         const newVal = type === 'checkbox' ? checked : value;
//         handleChange(name, newVal);
//     }

//     const formSubmit = () => {
//         const newPizzaOrder = {
//             size: formValues.size,
//             toppings: [ 'pepperoni', 'sausage', 'mushroom', 'anchovey' ].filter(topping => formValues[topping])
//         }
//         postNewOrder(newPizzaOrder)
//     }

//     const onSubmit = (e) => {
//         e.preventDefault();
//         formSubmit();
//     }

//     return (
//         <div>
//             <h1>ORDER PIZZA FOO!</h1>
//             <form id="pizza-form" onSubmit={onSubmit}>
//                 <label>Name:
//                     <input
//                         type="text"
//                         id="name-input"
//                         name="name"
//                         value={''}
//                         onChange={onChange}
//                         />
//                 </label>

    
//             <div>
//             <select id="size-dropdown" name="size" onChange={onChange}>
//                 <option value="">Select Size</option>
//                 <option value="s">Smallboi</option>
//                 <option value="m">Mediumboi</option>
//                 <option value="l">Largboi</option>
//             </select>
//             </div>
//                 <div>
//                 <h3>Choose toppings!</h3>
//                 <label>Pepperoni
//                     <input
//                         type="checkbox"
//                         name="pepperoni"
//                         checked={formValues.pepperoni}
//                         onChange={onChange}
//                         />
//                 </label>

//                 <label>Sausage
//                     <input
//                         type="checkbox"
//                         name="sausage"
//                         checked={formValues.sausage}
//                         onChange={onChange}
//                         />
//                 </label>

//                 <label>Mushroom
//                     <input
//                         type="checkbox"
//                         name="mushroom"
//                         checked={formValues.mushroom}
//                         onChange={onChange}
//                         />
//                 </label>

//                 <label>Anchovey
//                     <input
//                         type="checkbox"
//                         name="anchovey"
//                         checked={formValues.anchovey}
//                         onChange={onChange}
//                         />
//                 </label>
//                 </div>

//                <label>Special instructions:
//                 <input
//                     className='text-input'
//                     type='text'
//                     id='special-text'
//                     name='special'
//                     onChange={onChange}
//                     placeholder="Anything else you'd like to add?"/>
//                     </label>
                

          

            

//             </form>
//         </div>
//     )
// }

// export default Form;

import React, { useState } from 'react';
import axios from 'axios';
import { } from 'react-router-dom'
import * as Yup from "yup";


const initialFormValues = {
    //dropdown
    size: '',
    //radio buttons
    sauce: '',
    //checkboxes
    cheese: false,
    pepperoni: false,
    anchovies: false,
    sausage: false,
    mushrooms: false,
    peppers: false,
    //text input
    specialInstructions:''
}

const initialPizzaOrder = []



function Form () {
    // STATES //
    const [pizzaOrder, setPizzaOrder] = useState(initialPizzaOrder)
    const [formValues, setFormValues] = useState(initialFormValues) // object
    // const [formErrors, setFormErrors] = useState(initialFormErrors) // object
    // const [disabled, setDisabled] = useState(initialDisabled)       // boolean

    // HELPERS //
    const postNewOrder = newOrder => {
        axios.post("notarealsite.com", newOrder)
        .then(res => {
            setPizzaOrder([...pizzaOrder, res.data])
            console.log(pizzaOrder)
        })
        .catch(err => {
            console.log(`NO PIZZA FOR YOU ${err}`)
        })
        setFormValues(initialFormValues)
    }




    // EVENT HANDLERS //

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
            <h3>Choose Type Of Sauce</h3>
                <label>Original Red
                    <input 
                    type='radio'
                    name='sauce'
                    value='Original Red'
                    onChange={onChange}
                    checked={formValues.sauce === 'Original Red'}
                    />
                </label>
        
                <label>Garlic Ranch
                    <input
                    type='radio'
                    name='sauce'
                    value='Garlic Ranch'
                    onChange={onChange}
                    checked={formValues.sauce === 'Garlic Ranch'}
                    />
                </label>
                <label>BBQ Sauce
                    <input 
                    type='radio'
                    name='sauce'
                    value='BBQ Sauce'
                    onChange={onChange}
                    checked={formValues.sauce === 'BBQ Sauce'}
                    />
                </label>
        
                <label>Spinach Alfredo
                    <input
                    type='radio'
                    name='sauce'
                    value='Spinach Alfredo'
                    onChange={onChange}
                    checked={formValues.sauce === 'Spinach Alfredo'}
                    />
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

export default Form