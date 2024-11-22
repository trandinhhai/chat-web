import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {BiPowerOff} from 'react-icons/bi';

export default function Logout(){
    const navigate = useNavigate()
    const handleClick = async () => {
        localStorage.clear()
        navigate("/login")
    }
    return (
        <Button onClick={handleClick}>
            <BiPowerOff/>
        </Button>
    )

}
const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .8rem;
    border-radius: 1.2rem;
    background-color: #00f06c69;
    border: none;
    cursor: pointer;
    color: #000;
    transition: .3s ease-in-out;
    svg {
        font-size: 1.3rem;
    }
    &:hover{
        transform: scale(1.1);
        color: #00ff73;
        background-color: #6666665f;
    }
`