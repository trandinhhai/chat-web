import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import  Loader  from "../assets/loader.gif"
import styled from "styled-components";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/ReactToastify.css';
import axios from "axios"
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
export default function SetAvatar() {
    const api = "https://api.multiavatar.com";
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    const toastOption = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }
    useEffect(() => {
        if(!localStorage.getItem('chat-app-user')) {
            navigate('/login')
        }
    }, [])
    const setProfilePicture = async () => {
        if(selectedAvatar === undefined){
            toast.error("please select an avatar", toastOption)
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"))
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar]
            })

            if(data.isSet){
                user.isAvatarImageSet = true
                user.avatarImage = data.image
                localStorage.setItem("chat-app-user", JSON.stringify(user))
                navigate('/')
            } else {
                toast.error("Error setting avatar. please try again", toastOption)
            }
        }
    }
    useEffect(() => {
        const fetchAvatars = async () => {
          try {
            const data = [];
            for (let i = 0; i < 4; i++) {
              const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}?apikey=4cgdRHs36jPBme`);
              if (response.data) {
                const buffer = Buffer.from(response.data);
                data.push(buffer.toString('base64'));
              }
            }
            setAvatars(data);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching avatars:', error);
            setIsLoading(false);
          }
        };
      
        fetchAvatars();
      }, []);
    
    return (
        <>
            {
                isLoading ? <Container>
                    <img src={Loader} alt="loader" className="loader" />
                </Container> : (

            <Container>
                <div className="title-container">
                    <h1>
                        Chọn ảnh đại diện
                    </h1>
                </div>
                <div className="avatars">
                    {
                        avatars.map((avatar, index) => {
                            return (
                                <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" 
                                        onClick={() => setSelectedAvatar(index)}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <button className="submit-btn" onClick={setProfilePicture}>
                    Đồng ý
                </button>
            </Container>
                       )}
            <ToastContainer/>
        </>
        
    ) 
}
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-image: linear-gradient(to right, #c6ffdd, #fbd786, #f7797d);
    height: 100vh;
    width: 100vw;
    .loader{
        width: 350px;
        max-inline-size: 100%;
    }
    .title-container{
        h1{
            color: #000000;
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img {
                height: 6rem
            }
        }
        .selected {
            border: 0.4rem solid #ff1e00;

        }
    }
    .submit-btn{
            background-color: #2bd57d;
            color: #000000;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.3s ease-in-out;
            &:hover{
                background-color: #000000;
                color: #12da73
            }
    }
`