import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_product } from "../components/API";
import { useCart } from "../components/Context/Cart";



const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();
  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        API_product+`/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Category-Products">
        <section className="menu" id="menu">
        <div className="container mt-3">
        <h3 className="text-center position">Category - {category?.name}</h3>
        <h5 className="text-center position">{products?.length} result found </h5>
        </div>
        
        <div className="d-flex flex-wrap box-container width position"style={{justifyContent:"center",gap:"5rem",marginBottom:"10rem"}}>
        {products?.map((p) => (
                <div
                  className="card m-2 box "
                  style={{ width: "40rem",borderRadius:"3rem",height:"100%" }}
                  key={p._id}
                >
                  <img
                    src={API_product+`/product-photo/${p._id}`}
                    className="card-img-top img"
                    alt={p.name}
                  />
                  <div className="card-body Products_info ">
                    <h5 className="card-title" style={{fontWeight:"bolder"}}>{p.name}</h5>
                    <p className="card-text" style={{fontWeight:"bolder"}}>
                      {p.description.substring(0, 30)}...
                    </p>
                   <p className="price"style={{fontWeight:"bolder",color:"black"}}> $ {p.price}</p>
                    <button style={{width:"60%",marginLeft:"4rem"}}
                      className=" allbtn btn1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                   

                  </div>
                </div>
              ))}
       
  
        </div>
   
      
  </section>
    
    </Layout>
  );
};

export default CategoryProduct;
    