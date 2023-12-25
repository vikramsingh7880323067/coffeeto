import React, { useState } from "react";
import "./Headers.css";
import logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { HiOutlineMenu } from "react-icons/hi";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../Context/auth";
import toast from "react-hot-toast";
import useCategory from "../../Hooks/useCategory";
import { useCart } from "../../Context/Cart";
import axios from "axios";
import { useSearch } from "../../Context/search";
import { Badge } from "antd";
import { API_product } from "../../API";
const Headers = () => {
  const categories = useCategory();
  const [showmenu, setShowMenu] = useState(false);
  const [cart] = useCart();
  const navigate = useNavigate();
  const [showsearchbar, setShowSearchBar] = useState(false);
  const [auth, setAuth] = useAuth();
  const [values, setValues] = useSearch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(API_product + `/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  const toggleMenu = () => {
    setShowMenu(!showmenu);
  };
 
  const togglesearch = () => {
    setShowSearchBar(!showsearchbar);
  };
  return (
    <>
      <header>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>

        <nav className={`navbar ${showmenu ? "active" : ""}`}>
          <a href="/">Home</a>
          <a href="/about">about</a>
          <a href="/blog">blog</a>

          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              style={{ position: "relative", bottom: "0.7rem" }}
              to={"/categories"}
              data-bs-toggle="dropdown"
            >
              Categories
            </Link>
            <ul className="dropdown-menu"  >
              <li>
                <Link
                  style={{ color: "black",fontSize:"1.2rem",fontWeight:"bolder" }}
                  className="custom-dropdown-item"
                  to={"/categories"}
                >
                  All Categories
                </Link>
              </li>
              {categories?.map((c) => (
                <li>
                  <Link
                    style={{ color: "black",fontSize:"1.2rem",fontWeight:"bolder" }}
                    className="dropdown-item "
                    to={`/category/${c.slug}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {!auth.user ? (
            <>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </>
          ) : (
            <>
              <FaUserCircle
                style={{
                  cursor: "pointer",
                  position: "relative",
                  left: "2rem",
                }}
                size={16}
                color="#ff7722"
              />

              <div className="dropdown">
                <button
                  style={{ position: "relative", left: "2rem", color: "white" }}
                  className=" custom-btn btn-secondary custom-btn-sm dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name}
                </button>
                <ul
                  style={{ position: "absolute", left: "2rem" }}
                  className="dropdown-menu"
                >
                  <li>
                    <a
                      style={{
                        color: "black",
                        fontWeight: "bolder",
                        fontSize: "1.5rem",
                      }}
                      href={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={handleLogout}
                      style={{
                        color: "black",
                        fontWeight: "bolder",
                        fontSize: "1.5rem",
                      }}
                      href="/login"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </nav>

        <div className="icons">
          <div id="icons" className="search-icon">
            <BiSearchAlt2 size={28} onClick={togglesearch} />
          </div>
          <div id="icons" className="cart-icon">
            <FaShoppingCart
              size={28}
              onClick={() => {
                navigate("/cart");
              }}
            />
            <Badge count={cart?.length} showZero />
          </div>
          <div id="icons" className="hanburger">
            <HiOutlineMenu size={28} onClick={toggleMenu} />
          </div>
        </div>
        <div className={`search-form ${showsearchbar ? "active" : ""}`}>
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Search here..."
              aria-label="Search"
              value={values.keyword}
              onChange={(e) =>
                setValues({ ...values, keyword: e.target.value })
              }
            />
          </form>
          <label for="search-box"></label>
        </div>
      </header>
    </>
  );
};

export default Headers;
