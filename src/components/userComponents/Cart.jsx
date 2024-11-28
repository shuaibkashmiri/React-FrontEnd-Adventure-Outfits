import React, { useEffect, useState } from "react";
import Authorized from "../../auth/Authorized";
import api from "../../utils/AxiosInstance";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

const Cart = () => {
  Authorized();
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [userAddress, setUserAddress] = useState([]);

  // Function to calculate the total price of items in the cart
  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setCartTotal(total);
  };

  // Fetch cart items
  const cartItems = async () => {
    try {
      const res = await api.get("/products/getcart");
      const cart = res.data.getUser.cart || [];
      setProducts(cart);
      calculateTotal(cart); // Recalculate total
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch user details
  const fetchUserData = async () => {
    try {
      const { data } = await api.get("/user/userdetails");
      setUserAddress(data.message.userdetails.addresses || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle item deletion and refresh state
  const deleteCartItem = async (productId) => {
    // Optimistically update the state
    const updatedProducts = products.filter(
      (item) => item.productId._id !== productId
    );
    setProducts(updatedProducts);
    calculateTotal(updatedProducts); // Recalculate total immediately

    try {
      await api.get(`/products/removeItem/${productId}`);
    } catch (error) {
      console.error("Failed to delete the item:", error);
      // Revert state if the API call fails
      await cartItems();
    }
  };

  // Initial data fetch
  useEffect(() => {
    cartItems();
    fetchUserData();
  }, []);

  return (
    <div className="container py-5">
      <div className="row">
        {/* Heading */}
        <div className="col-12 mb-4">
          <h1 className="text-center">
            {cartTotal > 0 ? "Items in Cart" : "No Items in Cart"}
          </h1>
        </div>

        {/* Cart Items */}
        {products.length > 0 ? (
          products.map((item) => (
            <div
              key={item.productId._id}
              className="col-12 col-md-6 col-lg-4 mb-4"
            >
              <div className="card shadow-sm border-light rounded">
                <div
                  className="card-img-top"
                  style={{
                    height: "200px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#f8f9fa",
                  }}
                >
                  <img
                    src={item.productId.imageUrl}
                    alt={item.name}
                    className="img-fluid"
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.productId.title}</h5>
                  <p className="card-text">
                    <strong>Size:</strong> {item.size}
                  </p>
                  <p className="card-text">
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p className="card-text text-primary">
                    <strong>Price:</strong> ₹{item.price}
                  </p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCartItem(item.productId._id)}
                  >
                    <MdDeleteForever className="me-2" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted">Your cart is currently empty.</p>
          </div>
        )}

        {/* Total and Checkout */}
        {cartTotal > 0 && (
          <div className="col-12 text-center mt-4">
            <h3 className="mb-3">Total: ₹{cartTotal}</h3>
            <Link
              to={userAddress.length === 0 ? "/user/address" : "/user/checkout"}
              className="btn btn-primary btn-lg"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
