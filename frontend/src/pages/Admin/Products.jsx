import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { API_product } from "../../components/API";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get( API_product+"/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  
  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Dashboard - All Products"}>
      <div className="row" style={{position:"relative",top:"10rem",marginBottom:"20rem"}}>
        <div className="col-md-3" >
          <AdminMenu />
        </div>
        <div className="col-md-9" style={{marginTop:"3rem"}}>
          <h1 className="text-center" style={{color:"white",fontWeight:"bolder",fontSize:"2.5rem",marginLeft:"5rem"}}>All Products List</h1>
          <div className="box-container" >
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                 <div className="box">
                  <img
                    src={ API_product+`/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body " >
                    <h5 style={{color:"white", fontWeight:"bolder" }} >{p.name}</h5>
                    <p  style={{color:"white", fontWeight:"bolder"}}>{p.description.substring(0, 30)}...</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;