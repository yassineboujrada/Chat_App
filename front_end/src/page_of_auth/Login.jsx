import React , {useState,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChatLogo from '../assets/chat.png';
import { toast,ToastContainer } from "react-toastify";
import { loginRoute } from "../utils/ApiRoutes.js";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Login(){

    const redirect = useNavigate();
    const RenderMessageOptions = {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    const [datainput,setDatainput] = useState({
        username:'',
        passwd:'',
    });

    useEffect(() => {
      if (localStorage.getItem("chat-app-current-user")) {
        redirect("/");
      }
    }, []);

    const handel_action_submit = async (evt) => {
        evt.preventDefault();
        try{
        if(addNew()){
            // console.log("wa zb",loginRoute);
            const {username,passwd} = datainput ;
            const {data} = await axios.post(loginRoute,{
                username,
                passwd,
            });
            if (data.status === false) {
                toast.error(data.msg, RenderMessageOptions);
            }
            if (data.status === true) {
                localStorage.setItem(
                    "chat-app-current-user",
                    JSON.stringify(data.user)
                );
                redirect("/");
            }
        };}catch(err){
            console.log(err);
        }
    }

    const addNew =()=>{
        const {username,passwd} = datainput ;
        if (passwd === "" || passwd.length<8){
            toast.error("probleme in passwordd",RenderMessageOptions);
            return false;
        }else if(username.length===0){
            toast.error("Username should be 4 characters or more",RenderMessageOptions);
            return false;
        }
        return true;
    }

    const handel_action_change = (evt) => {
        setDatainput({...datainput , [evt.target.name] : evt.target.value})
    }


    return(
        <div>
            <FORM_OF_REGISTRATION>
                <form onSubmit={(evt) => {handel_action_submit(evt)}}>
                    <div className='brand'>
                        <img src={ChatLogo} alt='logo' />
                        <h1>My Chat</h1>
                    </div>
                    <input type="text" placeholder="Enter you're username" name="username" onChange={e => handel_action_change(e)} required/>
                    <input type="password" placeholder="you're password ..." name="passwd" onChange={e => handel_action_change(e)} required/>
                    <button type='submit'>Login</button>
                    <span>
                        Don't have an account ? <Link to="/register" style={{color:"green",textDecoration:'underline'}} >Register</Link>
                    </span>
                </form>
            </FORM_OF_REGISTRATION>
            <ToastContainer />
        </div>
    )
}

const FORM_OF_REGISTRATION = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(93, 16, 164);
  gap: 1rem;
  align-items: center;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #131324;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;