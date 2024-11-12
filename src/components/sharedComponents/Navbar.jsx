import React, { useEffect, useState } from "react";
import "../styles/Navbar.scss";
import { Link, useNavigate, NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import { IoMdMenu } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { LiaFemaleSolid, LiaMaleSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";

import Cookies from "js-cookie";
import api from "../../utils/AxiosInstance";

const Navbar = (props) => {
  const [menuData, setMenuData] = useState(false);
  const [showSetting, setShowSettings] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [user, setUser] = useState("");
  const [cart, setCart] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowSettings(false);
    setDropDown(false);
    Cookies.remove("token");
    setUser("");
    navigate("/");
    setLoading(!false);
  };

  function toggleDropDown() {
    setDropDown(!dropDown);
  }
  const toggleSetting = () => {
    setShowSettings(!showSetting);
  };

  const toggleMenu = () => {
    setMenuData(!menuData);
  };

  const getUserData = async () => {
    try {
      const res = await api.get("/user/userdetails");
      setUser(res.data.message.userdetails.email);
      setCart(res.data.message.userdetails.cart.length);
      setLoading(!loading);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      getUserData();
    }
  }, [props.change, setCart]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to={"/"} className="navbar-brand">
              <img src={logo} />
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to={"/"} className="nav-link ">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/Men"} className="nav-link">
                  Men
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/women"} className="nav-link">
                  Women
                </NavLink>
              </li>

              {!user && (
                <li className="nav-item">
                  <NavLink to={"/login"} className="nav-link">
                    Login
                  </NavLink>
                </li>
              )}
              {user && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item">My Orders</a>
                    </li>
                    <li>
                      <a className="dropdown-item">Settings</a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <NavLink className="dropdown-item" onClick={handleLogout}>
                        Log-Out
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}

              {user && (
                <li className="nav-item">
                  <NavLink to={"/cart"} className="nav-link">
                    <NavLink to={"usercart"} className="cart">
                      <FaCartArrowDown /> {cart}
                    </NavLink>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
