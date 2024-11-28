import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { FaCartArrowDown } from "react-icons/fa";
import Cookies from "js-cookie";
import api from "../../utils/AxiosInstance";

const Navbar = (props) => {
  const [user, setUser] = useState("");
  const [cart, setCart] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    setUser("");
    navigate("/");
  };

  const getUserData = async () => {
    try {
      const res = await api.get("/user/userdetails");
      setUser(res.data.message.userdetails.email);
      setCart(res.data.message.userdetails.cart.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUserData();
    }
  }, [props.change]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            className="logo"
            style={{ height: "80px", width: "auto" }}
          />
        </Link>

        {/* Toggler for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/men" className="nav-link">
                Men
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/women" className="nav-link">
                Women
              </NavLink>
            </li>

            {!user ? (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user}
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        Log-Out
                      </button>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <NavLink to="/cart" className="nav-link">
                    <FaCartArrowDown className="me-1" />
                    {/* {cart} */}
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
