
import React,{useState} from 'react'
import loginImg from "../../assests/login.png"
import styles from "./auth.module.scss";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../components/Context/auth';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import { API_auth } from '../../components/API';

const Login = () => {
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const [auth,setAuth]=useAuth();
const navigate=useNavigate();
const location=useLocation();

const loginUser= async (e)=>{
    e.preventDefault();
    try{
        const response =await axios.post(API_auth+"/login",{email,password});
        if(response.data.success){
            toast.success(response.data.message);
            setAuth(
                {
                    ...auth,
                    user:response.data.user,
                    token:response.data.token,
                }
            );
            localStorage.setItem("auth",JSON.stringify(response.data))
            navigate( location.state||"/");
           
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


const style1 = { color: 'white' , position:"relative",top:"3rem" };
const style2 = { fontWeight: 'bolder' };
const combinedStyles = { ...style1, ...style2 };
  return (
    <Layout title="Login-Now">
    <section className={`container ${styles.auth} `} style={{marginTop:"13rem"}}>
    <div className={styles.img}>
        <img style={{borderRadius:"10rem"}} src={loginImg} alt="login" width={400}/>
    </div>
    
<div className={styles.form}>
    <h2>Login</h2>
    <form onSubmit={loginUser}>
    <input 
    type="text"
    placeholder='Email'
    required
    value={email}
    onChange={(e)=>{
        setEmail(e.target.value)
    }} />
    <input 
    type="password"
    placeholder='Password'
    required
    value={password}
    onChange={(e)=>{
        setPassword(e.target.value)
    }} />
    
    <button
    type='submit'
    className='--btn --btn-primary --btn-block'
    >Login</button>
     <button style={{position:'relative',top:"2rem"}}onClick={()=>{navigate("/forgot-password")}}
    type='submit'
    className='--btn --btn-primary --btn-block'
    >Forgot Password</button>
    </form>
    <span className={styles.register}>
        <p style={combinedStyles} >Don't have an account?</p>
        <Link to="/register" style={{color:'white',position:"relative",top:"2.3rem",left:"1rem"}} >Register</Link>
    </span>
</div>

    </section>
    </Layout>
  )
}

export default Login

