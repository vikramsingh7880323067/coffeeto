import React,{useState} from 'react'
import loginImg from "../../assests/login.png"
import styles from "./auth.module.scss";
import { Link, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import { API_auth } from '../../components/API';
const initialState={
    email:"",
    newPassword:"",
    answer:"",
}
const ForgotPassword = () => {
    const[formData,setFormData]=useState(initialState);
    const{email,newPassword,answer}=formData;
    const navigate=useNavigate();

    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setFormData({...formData,[name]:value})
            }
    const ResetUser= async (e)=>{
        e.preventDefault();
        try{
            const response =await axios.post(API_auth+"/forgot-password",{email,newPassword,answer});
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
    
const style1 = { color: 'white' , position:"relative",top:"3rem" };
const style2 = { fontWeight: 'bolder' };
const combinedStyles = { ...style1, ...style2 };
  return (
    <div>
       <Layout title="Reset-Now">
   
    <section className={`container ${styles.auth} position`}>
    <div className={styles.img}>
        <img style={{borderRadius:"10rem"}} src={loginImg} alt="login" width={400}/>
    </div>
    
<div className={styles.form}>
    <h2>Reset-Here</h2>
    <form onSubmit={ResetUser}>
    <input 
    type="text"
    placeholder='Email'
    required
    name="email"
    value={email}
    onChange={handleInputChange} />
    
    <input 
    type="text"
    placeholder="What's Your Favourite Sport?"
    required
    name="answer"
    value={answer}
    onChange={handleInputChange} />

<input 
    type="text"
    placeholder='Enter Your NewPassword'
    required
    name="newPassword"
    value={newPassword}
    onChange={handleInputChange} />
    
     <button style={{position:'relative',top:"2rem"}}
    type='submit'
    className='--btn --btn-primary --btn-block'
    >Reset</button>
    </form>
    <span className={styles.register}>
        <p style={combinedStyles} >Don't have an account?</p>
        <Link style={{color:"white",fontWeight:"bolder",position:"relative",left:"1rem",top:"2.5rem"}}to="/register">Register</Link>
    </span>
</div>
    </section>
    </Layout>
    </div>
  )
}

export default ForgotPassword
