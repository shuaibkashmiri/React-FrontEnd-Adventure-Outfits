import React, { useEffect, useState } from "react";
import api from "../../utils/AxiosInstance";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import "./admin.scss";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  // Function to fetch orders data
  const ordersData = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setOrders(res.data.orders); // Assuming response contains the orders array
    } catch (error) {
      console.log(error);
      toast.error("Error in Getting Data");
    }
  };

  // Function to change the order status
  const changeStatus = async (orderId, status) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status });
      toast.success("Order status updated");
      ordersData(); // Fetch updated data
    } catch (error) {
      toast.error("Error updating order status");
    }
  };

  // Function to cancel the order
  const cancelOrder = async () => {
    try {
      if (!orderToCancel) return;

      // Make the API request to cancel the order
      await api.delete(`/order/delete/${orderToCancel._id}`);
      toast.success("Order canceled successfully");
      setShowModal(false);
      ordersData(); // Fetch updated data
    } catch (error) {
      toast.error("Error canceling order");
      setShowModal(false);
    }
  };

  // Fetch orders when component mounts
  useEffect(() => {
    ordersData();
  }, []);

  // Merge orders with the same order ID
  const mergedOrders = [];
  orders.forEach((order) => {
    const existingOrderIndex = mergedOrders.findIndex(
      (mergedOrder) => mergedOrder._id === order._id
    );
    if (existingOrderIndex === -1) {
      mergedOrders.push(order);
    } else {
      mergedOrders[existingOrderIndex].products = [
        ...mergedOrders[existingOrderIndex].products,
        ...order.products,
      ];
    }
  });

  return (
    <div className="container-fluid pt-5">
      <div className="row pt-5">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-dark text-white p-4 min-vh-100">
          <h2 className="text-center mb-4">Admin Panel</h2>
          <ul className="list-unstyled">
            <li className="mb-3">
              <Link
                to="/admin/add-product"
                className="text-decoration-none text-white"
              >
                <button className="btn btn-light w-100">Add Products</button>
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/admin/all-orders"
                className="text-decoration-none text-white"
              >
                <button className="btn btn-light w-100">All Orders</button>
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/admin/all-users"
                className="text-decoration-none text-white"
              >
                <button className="btn btn-light w-100">All Users</button>
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="col-md-9 col-lg-10 bg-light p-4">
          <h1 className="text-center mb-4">All Orders</h1>
          <div className="table-responsive" style={{ overflowX: "scroll" }}>
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Products</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Payment Status</th> {/* New column for Payment Status */}
                  <th>Shipping Address</th>
                  <th>Order Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mergedOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.username}</td>
                    <td>{order.user.email}</td>
                    <td>
                      {order.products.map((product, prodIndex) => (
                        <div
                          key={prodIndex}
                          className="d-flex align-items-center"
                        >
                          <img
                            src={product.productId.imageUrl}
                            alt={product.productId.title}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              marginRight: "10px",
                            }}
                          />
                          {product.productId.title}
                        </div>
                      ))}
                    </td>
                    <td>
                      {order.products.reduce((totalQuantity, product) => {
                        return totalQuantity + product.quantity;
                      }, 0)}
                    </td>
                    <td>{order.status}</td>
                    <td>{order.isPaymentDone ? "Success" : "Pending"}</td>{" "}
                    {/* Display Payment Status */}
                    <td>
                      {order.address && order.address.length > 0 ? (
                        <div>
                          <p>{order.address[0].fullname}</p>
                          <p>{order.address[0].street}</p>
                          <p>
                            {order.address[0].city}, {order.address[0].state}
                          </p>
                          <p>{order.address[0].contact}</p>
                        </div>
                      ) : (
                        <p>No Address</p>
                      )}
                    </td>
                    <td>{new Date(order.orderDate).toLocaleString()}</td>
                    <td>
                      <div className="d-flex gap-2 flex-wrap">
                        {/* Change Status Dropdown */}
                        <div className="dropdown">
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            id={`statusDropdown${order._id}`}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Change Status
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby={`statusDropdown${order._id}`}
                          >
                            {["Shipped", "Delivered"].map((status, idx) => (
                              <li key={idx}>
                                <button
                                  className="dropdown-item"
                                  onClick={() =>
                                    changeStatus(order._id, status)
                                  }
                                >
                                  {status}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Cancel Order Button */}
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setOrderToCancel(order);
                            setShowModal(true);
                          }}
                        >
                          Cancel Order
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for Order Cancellation */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Cancellation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to cancel this order?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                No
              </Button>
              <Button variant="danger" onClick={cancelOrder}>
                Yes, Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
