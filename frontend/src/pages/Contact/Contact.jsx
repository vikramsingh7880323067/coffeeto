
import React,{useState}from 'react'
import "./Contact.css";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import contact from "./contact.jpg"
import toast from 'react-hot-toast';


const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit=()=>{
        toast.success('Message sent successfully', {
            position: toast.POSITION.TOP_CENTER,
          });
      }
  
     
  return (
 
   <section className='contact' id="contact" style={{width:"100%"}}>
            <h1 className='heading'>
                contact
                <span>us</span>
            </h1>
        <div className='row' style={{display:"flex"}}>
            <img
            src={contact}
            alt="contactus"
            style={{ width: "100%" }}
          />
            <div className="col-md-4" style={{width:"100%",marginTop:"2rem"}}>
           <p className="text-justify mt-2" style={{color:"white"}}>
             any query and info about prodduct feel free to call anytime we 24X7
             vaialible
           </p>
           <p className="mt-3" style={{color:"white"}}>
             <BiMailSend /> : bobvik2003@gmail.com
           </p>
           <p className="mt-3" style={{color:"white"}}>
             <BiPhoneCall /> : 9219251196
           </p>
           <p className="mt-3" style={{color:"white"}}>
             <BiSupport /> : 1800-0000-0000 (toll free)
           </p>
         </div>
         
          
            </div>
    </section>
 
  )
}

export default Contact
