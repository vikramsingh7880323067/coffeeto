import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../components/Prices";
import axios from "axios";
import { API_category,API_product } from "../../components/API";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../components/Context/Cart";
import toast from "react-hot-toast";
import Home from "../../components/Layout/Home/Home";
import Review from "../Review/Review";
import Contact from "../Contact/Contact";


const HomePage = () => {
 const navigate=useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


 
   //get all cat
   const getAllCategory = async () => {
    try {
      const { data } = await axios.get(API_category+"/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get( API_product+`/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
useEffect(()=>{
getAllProducts();
},[])
  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(API_product+"/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_product+`/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(API_product+"/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
 
    <Layout title={"ALl Products - Best offers "}>
      <Home/>
    <div className=" homepage width" >
        <div className="col-md-2 filter">
          <h4 className="text-center h42" style={{color:"white",position:"relative",top:"4rem",right:"2.5rem"}} >Filter By Category</h4>
          <div className="d-flex flex-column ">
            {categories?.map((c) => (
              <Checkbox className="center" style={{color:'white',position:'relative',top:"5rem"}}
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4 position h4" style={{right:"4.5rem",fontSize:"2.2rem"}} >Filter By Price</h4>
          <div className="d-flex flex-column" >
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id} >
                  <Radio className="position" value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button style={{position:"relative",top:"10rem",right:"1rem",backgroundColor:"blue"}}
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        <section className="menu" id="products">
        <h1 className="text-center"style={{color:"white"}} >All Products</h1>
        <div className="box-container">
        {products?.map((p) => (
               <div className="box">
                <img
                  src={API_product+`/product-photo/${p._id}`}
                  className="img"
                  alt={p.name}
                />
              <div className='Products_info'>
                  <h3 className="card-title" style={{textAlign:"center"}} >{p.name}</h3>
                  <p className="card-text" style={{fontWeight:"bolder",color:"white"}}>
                    {p.description.substring(0, 30)}...
                  </p>
                  <div className="price"> <p className="price "> $ {p.price}</p></div>
                  <button className="allbtn btn1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className="allbtn btn2" onClick={() => {
  const updatedCart = [...cart, p];
  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  toast.success("Item Added to cart");
}}>
  ADD TO CART
</button>
</div>
</div>
            ))}
        
        </div>
        <div className="m-2 p-3">
            {products && products.length < total && (
              <button style={{textAlign:"center"}}
                className="btn btn-warning "
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
    </div>
  </section>
      </div>
      <Review/>
      <Contact/>
    </Layout>

    
     </>
    
  );
};

export default HomePage;