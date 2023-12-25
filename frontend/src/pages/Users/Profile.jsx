import React, { useState,useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import styles from "../auth/auth.module.scss";
import loginImg from "../../assests/register.png";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../components/Context/auth";
import { API_auth } from "../../components/API";



const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();
  

    //get user data
    useEffect(() => {
      const { email, name, phone, address } = auth?.user;
      setName(name);
      setPhone(phone);
      setEmail(email);
      setAddress(address);
    }, [auth?.user]);

 

   // form function
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(API_auth+"/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Dashboard-Profile">
        <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3 position" >
            <UserMenu />
          </div>
      <section
        style={{ position: "relative", top: "10rem" }}
        className={`container ${styles.auth}`}
      >
      
          <div className={styles.form}>
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              <input style={{color:"white"}}
                type="text"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="text"
                placeholder="Phone number"
                required
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Address"
                required
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              
              <button type="submit" className="--btn --btn-primary --btn-block">
              UPDATE
              </button>
            </form>
          </div>
       
        <div className={styles.img} style={{position:'relative',top:"3rem"}} >
          <img
            style={{ borderRadius: "10rem" }}
            src={loginImg}
            alt="login"
            width={400}
          />
        </div>
      </section>
      </div>
      </div>
    </Layout>
  );
};

export default Profile;
