import React, {useState} from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"

export default function ChatInput({handleSendMsg}){
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState("")
    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }
    const handleEmojiClick = (event) => {
        let message = msg;
        message += event.emoji;
        setMsg(message);
        console.log(message)
    }
    const sendChat = (event) =>{
        event.preventDefault()
        if(msg.length>0){
            handleSendMsg(msg)
            setMsg('')
        }
    }
    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                    {
                        showEmojiPicker && 
                        <Picker onEmojiClick={handleEmojiClick}  />
                    }
                </div>
            </div>
            <form className="input-container" onSubmit={(e) => sendChat(e)}>
                <input type="text" placeholder="Aa" value={msg} onChange={(e) => setMsg(e.target.value)}/>
                <button className="submit">
                    <IoMdSend/>
                </button>
            </form>
        </Container>
    )
}
const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: transparent;
    border-radius: 4rem;
    padding: 0 2rem;
    padding-bottom: .3rem;
    .button-container{
        display: flex;
        align-items: center;
        color: #000000;
        gap: 1rem;
        .emoji{
            position: relative;
            svg {
                font-size: 2rem;
                color: #f6ff00c0;
                cursor: pointer;
                transition: .5s ease-in-out;
                &:hover{
                    color: #f6ff00;
                    transform: scale(1.3);
                }
            }

            .EmojiPickerReact{
                position: absolute;
                bottom: 120%;
                background-color: transparent;
                background-image: linear-gradient(#000000eb, #00000031);
                box-shadow: 0 5px 10px #00000024;
                border-color: #00000010;
                border: none;
                border-radius: 2rem;
                input{
                    background-color: transparent;
                    border-color: #00000010;
                }
                h2{
                    background-color: transparent;
                    border-color: #00000010;
                }
                .epr_wtwvf4::-webkit-scrollbar{
                    background-color: #00000038;
                    width: 5px;
                    &-thumb{
                        background-color: #00ae80;
                    }
                }
            }
        }
    }
    .input-container{
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: transparent;
        border-bottom: 1px solid transparent;
        transition: .5s ease-in-out;
        &:hover{
            border-bottom: 1px solid #00000036;
        }
        input{
            width: 90%;
            height: 60%;
            background-color: transparent;
            color: #000000;
            border: none;
            padding-left: 2rem;
            font-size: 1.2rem;
            &::selection{
                background-color: #fff;
            }
            &:focus{
                
                outline:none;
            }

        }
        button{
            padding: .3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: transparent;
            border: none;
            cursor: pointer;
            transition: .3s ease-in-out;
            svg{
                font-size: 2rem;
                color: #15cb94;
                transition: .3s ease-in-out;
            }
            &:hover{
                transform: scale(1.1);
                svg{
                    color: #0de5a4;
                }
            }
        }
    }   
`