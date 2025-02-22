import React, { useState, useEffect} from 'react';
import axios from 'axios';
import * as yup from 'yup';



const initialFormValues = {
    name: '',
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

const emptyFormValues = {
    name: '',
    size: '',
    sauce: '',
    cheese: false,
    pepperoni: false,
    anchovies: false,
    sausage: false,
    mushrooms: false,
    peppers: false,
    specialInstructions:''
  };

const initialPizzaOrder = []

const emptyErrors = {
    name: '',
    size: '',
    sauce: '',
    cheese: '',
    pepperoni: '',
    anchovies: '',
    sausage: '',
    mushrooms: '',
    peppers: '',
    specialInstructions:''
}



function Form() {
    const [pizzaOrder, setPizzaOrder] = useState(initialPizzaOrder)
    const [formValues, setFormValues] = useState(initialFormValues) 
    const [validName, setValidName] = useState(true)
    const [errors, setErrors] = useState(emptyErrors)

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

    const [newPizza, setNewPizza] = useState([]);
    
    

    const handleSubmit = (evt) => {
        axios
          .post("https://reqres.in/api/orders", formValues)
          .then(
            (res) => setNewPizza([res.data, ...newPizza]),
            setFormValues(emptyFormValues)
          )
          .catch((err) => console.log(err));
      };


    // const handleNameChange = e => {
    //    const {name, value} = e.target
    //    setFormValues((previousFormValues) => ({
    //     ...previousFormValues,
    //     [name]: value
    //    }))
    //    setValidName(value.length >= 2)
    // }
    
        const formSchema = yup.object().shape({
            name: yup
                .string()
                .trim()
                .min(2, "name must be at least 2 characters"),
            size: yup
                .string()
                .oneOf(["Smallboi", "Mediumboi", "Largboi"], "Choose a size"),
            cheese: yup
                .boolean(),
            pepperoni: yup
                .boolean(),
            anchovies: yup
                .boolean(),
            sausage: yup
                .boolean(),
            mushrooms: yup
                .boolean(),
            peppers: yup
                .boolean(),
            specialInstructions:yup
                .string()
            })
        
        const validate = (name, value) => {
            yup
              .reach(formSchema, name)
              .validate(value)
              .then(() => {
                setErrors({ ...errors, [name]: "" });
              })
              .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
          };
    
    // const handleChange = (name, value) => {
    //     validate(name, value);
    //     setFormValues({ ...formValues, [name]: value });
    //   };

    const handleChange = (e) => {
        const { name, value } = e.target;
        validate(name, value);
        setFormValues({ ...formValues, [name]: value });
      };

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
            name: formValues.name,
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
    
    
    
    useEffect(() => {
        formSchema.isValid(formValues).then((valid) => {});
      }, [formValues]);


    return (
        <div>
            <h3>Build Your Own Pizza!</h3>
            <form onSubmit={onSubmit} 
            id='pizza-form'
            submit={handleSubmit}
            change={handleChange}
            
            >
            <label>
                Name:
                     <input
                         type="text"
                         id="name-input"
                         name="name"
                         value={formValues.name}
                         onChange={handleChange}
                      />
             </label>
            {/* {!validName && (
                // alert("name must be at least 2 characters")
            )} */}
            <h5>{errors.name}</h5>
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
                <button className="submit" id="order-button">submit</button>
            </form>
        </div>
        
    )
}

export default Form;