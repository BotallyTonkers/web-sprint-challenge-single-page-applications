import React from "react"
import { useNavigate } from "react-router"
import styled from "styled-components";

const Buttonhome = styled.div`
    padding: 0%;
`

export default function Home()
{
    
    const navigate = useNavigate();

    
    const routeToForm = () => 
    {
      
      console.log(navigate);

     
      navigate("pizza");
    }

    //Return function
  return (
        <div className = "homebox">
            <Buttonhome className= "tHeBuTtOn" id= "order-pizza" onClick={routeToForm}>ORDER YOU SOME PIZZA</Buttonhome>
        </div>
    )};