import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { API_product } from "../../components/API";
import { useCart } from "../../components/Context/Cart";
import toast from "react-hot-toast";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        API_product + `/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        API_product + `/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2 position width">
        <div className="col-md-6">
          <img
            style={{ width: "30rem" }}
            src={API_product + `/product-photo/${product._id}`}
            className="card-img-top "
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6">
          <h1 className="custom-text-center details" style={{ color: "white" }}>
            Product Details
          </h1>
          <h4 style={{ color: "white" }}>Name : {product.name}</h4>
          <h4 style={{ color: "white" }}>
            Description : {product.description}
          </h4>
          <h4 style={{ color: "white" }}>Price : ${product.price}</h4>
          <h4 style={{ color: "white" }}>
            Category : {product?.category?.name}
          </h4>
          <button
            class="btn btn-danger ms-1 allbtn"
            onClick={() => {
              const updatedCart = [...cart, product];
              setCart(updatedCart);
              localStorage.setItem("cart", JSON.stringify(updatedCart));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div
        className="row container width"
        style={{ position: "relative", top: "6rem", marginBottom: "10rem" }}
      >
        <h6
          style={{
            fontWeight: "bolder",
            color: "white",
            fontSize: "2.3rem",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Similar Products
        </h6>
        {relatedProducts.length < 1 && (
          <p
            className="text-center"
            style={{ color: "white", fontWeight: "bolder", fontSize: "1.3rem" }}
          >
            No Similar Products found
          </p>
        )}
        <div
          className="d-flex flex-wrap"
          style={{ justifyContent: "center", gap: "5rem" }}
        >
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                onClick={() => navigate(`/product/${p.slug}`)}
                src={API_product + `/product-photo/${p?._id}`}
                className="card-img-top img"
                alt={p.name}
              />
              <div className="card-body">
                <h5
                  className="card-title"
                  style={{ textAlign: "center", fontWeight: "700" }}
                >
                  {p.name}
                </h5>
                <p
                  className="card-text"
                  style={{ textAlign: "center", fontWeight: "500" }}
                >
                  {p.description.substring(0, 30)}...
                </p>
                <p
                  className="card-text"
                  style={{ textAlign: "center", fontWeight: "500" }}
                >
                  {" "}
                  $ {p.price}
                </p>

                <button
                  class=" allbtn"
                  onClick={() => {
                    const updatedCart = [...cart, p];
                    setCart(updatedCart);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                    toast.success("Item Added to cart");
                  }}
                  style={{ position: "relative", left: "2rem" }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
