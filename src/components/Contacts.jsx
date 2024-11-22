import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png"
export default function Contacts({contacts, currentUser, changeChat}){
    
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)

        }
    }, [currentUser])
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index)
        changeChat(contact)
    }

  const filteredContacts = contacts.filter((contact) =>
    contact.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

    return <>
    {currentUserImage && currentUserName && (
      <Container>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h2>CBO</h2>
        </div>
        <div className="contacts">
          <div className="find">
            <input
              type="text"
              placeholder="tìm kiếm người dùng"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          {filteredContacts.map((contact, index) => {
            return (
              <div
                className={`contact ${index === currentSelected ? "selected" : ""}`}
                key={index}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
      </Container>
    )}
  </>

    
}
const Container = styled.div`
    width: 350px;
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: transparent;
    background-image: linear-gradient(to right, #00d781b6,#29a2869e,#29a27a36, transparent);
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap:0.5rem;
        img {
            height: 2.5rem;
        }
        h2{
            font-size: 1.8rem;
            font-weight: 800;
            color: #2b2727;
            text-transform: uppercase;
        }
    }
    .find{
        display: flex;
        width: 90%;
        align-items: center;
        justify-content: center;
        input{
            flex: 8;
            height: 35px;
            border: none;
            background-color: transparent;
            border-radius: 2rem;
            outline: none;
            border-bottom: 1px solid transparent;
            padding: 10px;
            transition: .5s ease-in-out;
            font-size: 1.1rem;
            &:hover{
                border-bottom: 1px solid #000000;

            }
        }

    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar{
            width: .5rem;
            &-thumb {
                background-color: #16835dac;
                width: 1rem;
                border-radius: 4rem;

            }
        }
        .contact {
            background-color: transparent;
            background-image: linear-gradient(to right, #29a27839,#29a27029,transparent, transparent);
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 4rem;
            padding: 0%.4rem;
            gap: 1rem;
            align-items: center;
            display: flex;
            transition: 0.5s ease-in-out;
            .avatar{
                img{
                    height: 3rem;
                }
            }
            .username{
                h3{
                    color:#000
                }
            }
            &:hover{
                background-color: #00000014;
                transform: scale(1.05);
            }
        }
        .selected {
            background-color: #16785958;
            transform: scale(1.05);
        }
    }
    .current-user{
        background-color: transparent;
        background-image: linear-gradient(to right, #176645a8,#1966487b,#20855b10, transparent);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        .avatar{
            img{
                height: 4rem;
                max-inline-size: 100%;
            }
        }
        .username{
                h2{
                    color: #000000;
                }
        }
        @media screen and (min-width: 720px) and (max-width: 1000px){
            gap: 0.5rem;
            .username{
                h2{
                    font-size: 1rem;
                }
            }
        } 
    }
`   