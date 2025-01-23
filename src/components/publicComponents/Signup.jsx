import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import api from "../../utils/AxiosInstance";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await api.post(`/user/signup`, {
        username,
        email,
        password,
      });
      if (res.data.message === "User Registered Successfully") {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Server Error");
    }
  };

  const handleClick = () => {
    handleSignup();
  };

  return (
    <>
      <ToastContainer />
      <div className="signup-page pt-5 mt-2 d-flex justify-content-center align-items-center vh-80 bg-dark">
        <div
          className="card p-5 m-5 shadow-lg bg-light"
          style={{
            width: "400px",
            marginTop: "50px", // More margin from the top
            marginBottom: "50px", // More margin from the bottom
          }}
        >
          <h2 className="text-center mb-4 text-dark">Register With Us</h2>
          <form>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">
                Full Name
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter your full name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Set your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-dark w-100 mb-3" // Changed button color to dark
              onClick={handleClick}
            >
              Register
            </button>
            <p className="text-center">
              Already a user?{" "}
              <Link to="/login" className="text-decoration-none">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
