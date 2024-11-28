import React, { useEffect, useState } from "react";
import api from "../../utils/AxiosInstance";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState([]); // Initialize as an empty array
  const [orderTotal, setOrderTotal] = useState(0);

  const navigate = useNavigate();

  // Fetch user data from the server
  const fetchUserData = async () => {
    try {
      const { data } = await api.get("/user/userdetails");

      // Check if the cart has items before updating state
      if (data.message?.userdetails?.cartValue === 0) {
        navigate("/"); // Redirect to home page if the cart is empty
        toast.error("No Items in the cart");
        return; // Early exit if cart is empty
      }

      setOrderTotal(data.message?.userdetails?.cartValue || 0);
      setUser(data.message?.userdetails?.addresses || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user details.");
    }
  };

  // Create an order
  const createOrder = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await api.post("/createOrder");
      if (res.data.message === "Order Created SucessFully") {
        navigate("/payment");
      } else if (res.data.message === "Your Cart Is Empty") {
        navigate("/"); // Redirect if cart is empty
        toast.error("Your Cart is empty");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating order.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data when component mounts
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Checkout Page</h2>

      <div className="card shadow p-4">
        <h4 className="mb-3">Confirm Your Order</h4>

        <div className="border rounded p-3 mb-4">
          <h5>Order Details</h5>
          <h6 className="text-muted">Shipping Address</h6>
          {user.length > 0 ? (
            <div>
              <p>
                <strong>Name:</strong> {user[0].fullname}
              </p>
              <p>
                <strong>Mobile No:</strong> {user[0].contact}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {`${user[0].landmark}, ${user[0].village} , ${user[0].street}, ${user[0].city}, ${user[0].state}, ${user[0].pincode}`}
              </p>
            </div>
          ) : (
            <p className="text-danger">No user data available.</p>
          )}
          <p>
            <strong>Order Total:</strong> ₹{orderTotal.toFixed(2)}
          </p>
        </div>

        <button
          className="btn btn-primary btn-block"
          onClick={createOrder}
          disabled={loading}
        >
          {loading ? "Creating Order..." : "Proceed For Payment"}
        </button>

        {orderId && (
          <div className="mt-4">
            <h5>Order ID: {orderId}</h5>
            <div className="mt-3">
              <label htmlFor="address" className="form-label">
                Delivery Address
              </label>
              <textarea
                id="address"
                className="form-control"
                rows="3"
                placeholder="Enter address or leave blank to use default"
              ></textarea>
            </div>
            <button className="btn btn-success mt-3" disabled={loading}>
              {loading
                ? "Updating Address..."
                : "Confirm Address & Place Order"}
            </button>
          </div>
        )}

        {message && (
          <div className="alert alert-info mt-4" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
