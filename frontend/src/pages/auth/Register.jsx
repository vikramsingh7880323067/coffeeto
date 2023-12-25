import React, { useState } from 'react'
import styles from "./auth.module.scss";
import loginImg from "../../assests/register.png"
import { Link, useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast";
import Layout from '../../components/Layout/Layout';
import {API_auth}  from '../../components/API';
import axios from "axios";
const initialState={
    name:"",
    email:"",
    password:"",
    phone:"",
    address:"",
    answer:"",
}

const style1 = { color: 'white' };
const style2 = { fontWeight: 'bolder' };
const combinedStyles = { ...style1, ...style2 };

const Register = () => {
    
    const[formData,setFormData]=useState(initialState);
    const{name,email,password,phone,address,answer}=formData;
    const navigate=useNavigate();
    
    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setFormData({...formData,[name]:value})
            }
        
    const registerUser=async(e)=>{
        e.preventDefault();
        try{
            const response =await axios.post(API_auth+"/register",{name,email,password,phone,address,answer});
            if(response.data.success){
                toast.success(response.data.message);
                navigate("/login");
            }
            else{
                toast.error(response.data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error("something wrong");
        }
     
    };
  return (
    <Layout title="Register-Now">
   <section style={{marginTop:"13rem"}} className={`container ${styles.auth} `}>

<div className={styles.form}>
<h2>Register</h2>
    <form onSubmit={registerUser}>
    <input 
    type="text"
    placeholder='Name'
    required
    name="name"
    value={name}
    onChange={handleInputChange} />
    <input 
    type="text"
    placeholder='Email'
    required
    name="email"
    value={email}
    onChange={handleInputChange} />
    <input 
    type="password"
    placeholder='Password'
    required
    name="password"
    value={password}
    onChange={handleInputChange} />

<input 
    type="text"
    placeholder='Phone number'
    required
    name="phone"
    value={phone}
    onChange={handleInputChange} />
    <input 
    type="text"
    placeholder='Address'
    required
    name="address"
    value={address}
    onChange={handleInputChange} />
     <input 
    type="text"
    placeholder="What's Your Favourite Sport?"
    required
    name="answer"
    value={answer}
    onChange={handleInputChange} />     
  <button
    type='submit'
    className='--btn --btn-primary --btn-block'
    >Register</button>
    </form>
    <span className={styles.register}>
        <p style={combinedStyles}>Already have an account?</p>
        <Link style={{color:"white",fontWeight:"bolder",position:"relative",bottom:"5px",left:"5px"}}to="/login">Login</Link>
    </span>
</div>

<div className={styles.img}>
    <img style={{borderRadius:"10rem"}} src={loginImg} alt="login" width={400}/>
</div>
   </section>
   </Layout>
  )
}

export default Register
