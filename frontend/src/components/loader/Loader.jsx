import React,{useState, useEffect} from 'react'
import { useNavigate,useLocation} from 'react-router-dom'
import styles from "./Loader.module.scss"
import loaderImg  from '../../assests/loader.gif'

const Loader = ({path="login"}) => {
  const [count,setCount]=useState(3);
  const navigate=useNavigate();
  const location =useLocation();

  useEffect(()=>{
const interval=setInterval(()=>{
  setCount((preValue)=>--preValue);
},1000);
count===0 && navigate(`/${path}`,{
  state:location.pathname,
});
return()=>clearInterval(interval);
  },[count,navigate,location,path])
  return (
    <div className={styles.wrapper}>
        <div className={styles.loader}>
        <img style={{position:"absolute", left:"10rem",bottom:"4rem"}}src={loaderImg} alt="loader" width={50}/>
        <h1 style={{color:"white",fontSize:"14px", fontWeight:"bolder"}}>redirecting to you in {count} second</h1>
        </div>
       
    </div>
 
  )
};


export default Loader
