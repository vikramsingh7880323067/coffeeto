import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../components/Context/auth";
import moment from "moment";
import { API_product,API_auth } from "../../components/API";

const Orders = () => {
  const [order, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(API_auth+"/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row" style={{position:"relative",top:"10rem"}}>
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center"style={{color:'white',fontWeight:"bolder"}}>All Orders</h1>
            {order?.map((o, i) => {
              return (
                <div className="border shadow" style={{marginBottom:"10rem"}}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th  style={{fontSize:"1.5rem"}} scope="col">#</th>
                        <th  style={{fontSize:"1.5rem"}} scope="col">Status</th>
                        <th  style={{fontSize:"1.5rem"}} scope="col">Buyer</th>
                        <th  style={{fontSize:"1.5rem"}} scope="col"> date</th>
                        <th  style={{fontSize:"1.5rem"}} scope="col">Payment</th>
                        <th  style={{fontSize:"1.5rem"}} scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{fontWeight:"bolder",height:"50px"}}>
                        <td style={{fontSize:"1.5rem"}}>{i + 1}</td>
                        <td style={{fontSize:"1.5rem"}}>{o?.status}</td>
                        <td style={{fontSize:"1.5rem"}}>{o?.buyer?.name}</td>
                        <td style={{fontSize:"1.5rem"}}>{moment(o?.createAt).fromNow()}</td>
                        <td style={{fontSize:"1.5rem"}}>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td style={{fontSize:"1.5rem"}}>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row order_flex" key={p._id} >
                        <div className="col-md-4 order_width">
                          <img 
                            src={API_product+`/product-photo/${p._id}`}
                            className="card-img-top order_image"
                            alt={p.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8 order_desc" >
                          <p style={{fontWeight:"bolder"}}>{p.name}</p>
                          <p style={{fontWeight:"bolder"}}>{p.description.substring(0, 30)}</p>
                          <p style={{fontWeight:"bolder"}}>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;