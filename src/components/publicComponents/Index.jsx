import React, { useEffect } from "react";
import Products from "./Products";
import "./main.scss";
const Index = () => {
  useEffect(() => {
    document.title = "Home";
  });
  return (
    <>
      <div className="hero-container">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="heading">Adventure Awaits!</h1>
          <p>Discover the perfect gear for your next adventure.</p>
          <a href="#shop" className="hero-btn">
            Shop Now
          </a>
        </div>
      </div>
      <Products />
    </>
  );
};

export default Index;
