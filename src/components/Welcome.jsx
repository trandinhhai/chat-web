import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif"
 export default function Welcome({currentUser}){
    return (
        <Container>
            <img src={Robot} alt="robot" />
            <h1>
                Chào mừng <span>{currentUser.username}</span>
            </h1> <br />
            <h3>
                Vui lòng chọn đối tượng để nhắn tin. 
            </h3>
        </Container>
    )
 }

 const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #000000;
    width: 80%;
    img{
        height: 20rem;
    }
    span {
        color: #00ff88;
    }
`