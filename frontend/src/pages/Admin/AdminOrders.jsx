import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../components/Context/auth";
import moment from "moment";
import { Select } from "antd";
import {API_auth, API_product } from "../../components/API";
const { Option } = Select;

const AdminOrders = () => {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(API_auth+"/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(API_auth+`/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard position">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center"style={{color:'white',fontWeight:"bolder"}}>All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow"  style={{marginBottom:"12rem"}}>
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{fontSize:"1.5rem"}} scope="col">#</th>
                      <th style={{fontSize:"1.5rem"}} scope="col">Status</th>
                      <th style={{fontSize:"1.5rem"}} scope="col">Buyer</th>
                      <th style={{fontSize:"1.5rem"}} scope="col"> date</th>
                      <th style={{fontSize:"1.5rem"}} scope="col">Payment</th>
                      <th style={{fontSize:"1.5rem"}} scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{fontSize:"1.5rem",fontWeight:"bold"}}>{i + 1}</td>
                      <td style={{fontSize:"1.5rem"}}>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td style={{fontSize:"1.5rem",fontWeight:"bold"}}>{o?.buyer?.name}</td>
                      <td style={{fontSize:"1.5rem",fontWeight:"bold"}}>{moment(o?.createAt).fromNow()}</td>
                      <td style={{fontSize:"1.5rem",fontWeight:"bold"}}>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td style={{fontSize:"1.5rem",fontWeight:"bold"}}>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={API_product+`/product-photo/${p._id}`}
                          className="card-img-top order_image"
                          alt={p.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8 order_desc">
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
    </Layout>
  );
};

export default AdminOrders;