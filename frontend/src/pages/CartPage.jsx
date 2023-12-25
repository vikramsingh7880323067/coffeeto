import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../components/Context/Cart";
import { useAuth } from "../components/Context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_product } from "../components/API";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
 
  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(API_product+"/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(API_product+"/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container" style={{marginBottom:"5rem"}}>
        <div className="row">
          <div className="col-md-12 position ">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
          
          </div>
        </div>
        <div className="row width "style={{justifyContent:"flex-start"}} >
          <div className="col-md-8 " style={{width:"100%",marginTop:"4rem"}}>
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-md-4 ">
                  <img
                    src={API_product+`/product-photo/${p._id}`}
                    className="card-img-top "
                    alt={p.name}
                    width="100px"
                    height={"200px"}
                  />
                </div>
                <div className="col-md-8 cart_content">
                  <p style={{fontWeight:"bolder"}}>{p.name}</p>
                  <p style={{fontWeight:"bolder"}}>{p.description && p.description.substring(0, 30)}</p>
                  <p style={{fontWeight:"bolder"}}>Price :${p.price}</p>
                  <button
                    className="btn btn-danger"style={{backgroundColor:"red"}}
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="custom-col-md-4 text-center position " >
          <h4 className="text-center" style={{color:"white",position:"relative"}}>
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
            <h2 style={{color:"white"}}>Cart Summary</h2>
            <p style={{color:"white"}}>Total | Checkout | Payment</p>
            <hr />
            <h4  style={{color:"white"}}>Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4 style={{color:"white"}}>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2" style={{position:'relative',marginBottom:"10rem"}}>
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn  
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button 
                    className="btn btn-primary "
                    onClick={handlePayment}
                    disabled={loading || !instance}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

