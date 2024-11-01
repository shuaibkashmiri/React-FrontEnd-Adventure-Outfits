import React, { useEffect, useState } from "react";
import "../styles/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
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
    if(!user){
      getUserData();
    }
  }, [props.change,loading]);


  return (
    <>
      <div className="navbar">
        <IoMdMenu className="menu" onClick={toggleMenu} />

        <div className={menuData ? "drop-down" : "display-none"}>
          <div className="close-btn">
            <IoClose onClick={toggleMenu} />
          </div>
          <ul>
            <li>
              <Link to="/"> Home</Link>
            </li>
            <li>
              <Link to="/men"> Men</Link>
            </li>
            <li>
              <Link to="/women"> Women</Link>
            </li>
          </ul>
        </div>

        {/* logo */}
        <Link to="/" className="homelink">
          <img src={logo} alt="LOGO" className="logo" />
        </Link>

        {/* ul */}
        <ul>
          <li>
            <Link to="/">
              {" "}
              <AiOutlineHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/men">
              <LiaMaleSolid /> Men
            </Link>
          </li>
          <li>
            <Link to="/women">
              <LiaFemaleSolid /> Women
            </Link>
          </li>
        </ul>

        <div>
          {user ? (
            <div className="userlogo">
              <div className="user">
                <p>{user}</p>

                <IoIosArrowDropdown onClick={toggleDropDown} />
              </div>
              <div className="cart-length">
                {" "}
                <Link to="/usercart">
                  <FaCartArrowDown className="cart" />
                </Link>
                <p>{cart}</p>
              </div>
            </div>
          ) : <Link to="/login" className="login-pc">Login</Link>
            
          }
          <div className={dropDown ? "dropdownmenu" : "display-none"}>
        <ul>
          <li>Setting</li>
          <li>Edit Profile</li>
          <hr />
          <li onClick={handleLogout}>Log-Out</li>
        </ul>
      </div>
        </div>

        {/* buttons */}

        <div>
          {user ? (
            <BsThreeDotsVertical className="dots" onClick={toggleSetting} />
          ) : (
            <Link to={"/login"} className="login-mobile">
              Login
            </Link>
          )}
        </div>
      </div>
      <div className={showSetting ? "settings" : "display-none"}>
        <ul>
          <li>{user}</li>
          <li>Edit Profile</li>
          <hr />
          <li>Settings</li>
          <li onClick={handleLogout}>
            <CiLogout /> Log-Out
          </li>
        </ul>
      </div>

      
    </>
  );
};

export default Navbar;
