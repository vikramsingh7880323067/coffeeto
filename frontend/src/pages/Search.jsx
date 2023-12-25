import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../components/Context/search";
import { API_product } from "../components/API";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/Context/Cart";
import toast from "react-hot-toast";
const Search = () => {
  const [values, setValues] = useSearch();
  const navigate=useNavigate();
  const [cart, setCart] = useCart();
  return (
    <Layout title={"Search results"}>
      <div className="container" style={{marginBottom:"15rem"}}>
        <div className="text-center position">
          <h1 style={{color:"white"}}>Search Resuts</h1>
          <h6 style={{fontWeight:"bolder",fontSize:"1.3rem"}}>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4 box-container " style={{display:"flex",justifyContent:"center"}}>
            {values?.results.map((p) => (
              <div className="card m-2 box " style={{ width: "30rem" }}>
                <img 
                  src={API_product+`/product-photo/${p._id}`}
                  className="card-img-top img"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title "style={{textAlign:"center",fontWeight:"bolder"}}>{p.name}</h5>
                  <p className="card-text"style={{fontWeight:"bolder"}} >
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"style={{fontWeight:"bolder"}}> $ {p.price}</p>
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
        </div>
      </div>
    </Layout>
  );
};

export default Search;