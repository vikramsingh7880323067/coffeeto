import { useState,useEffect } from "react";
import { useAuth } from "../Context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";
import { API_auth } from "../API";

export default function PrivateRoute(){
    const[ok,setOk]=useState(false);
    const[auth]=useAuth();
  
    useEffect(()=>{
        const authCheck=async()=>{
            const response=await axios.get(API_auth+"/user-auth")
            if(response.data.ok){
                setOk(true);
            }
            else{
                setOk(false);
            }
        }
        if(auth?.token) authCheck();
    },[auth?.token]);
    return ok?<Outlet/>: <Loader/>
}