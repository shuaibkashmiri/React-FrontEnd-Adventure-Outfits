import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../../utils/AxiosInstance";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const formData = { email, password };

  const handleLogin = async () => {
    try {
      const res = await api.post(`/user/login`, formData);
      if (res.data.message === "user loggin success") {
        toast.success("Logged In Successfully");
        props.setChange(!props.change);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function clickHandler() {
    handleLogin();
  }

  return (
    <>
      <ToastContainer />
      <div className="signup-page d-flex justify-content-center align-items-center vh-100 bg-dark">
        <div className="card p-4 shadow-lg bg-light" style={{ width: "400px" }}>
          <h2 className="text-center mb-4 text-dark">Login To Your Account</h2>
          <form>
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
              className="btn btn-primary w-100 mb-3"
              onClick={clickHandler}
            >
              Login
            </button>
            <p className="text-center">
              New User?{" "}
              <Link to="/signup" className="text-decoration-none">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
