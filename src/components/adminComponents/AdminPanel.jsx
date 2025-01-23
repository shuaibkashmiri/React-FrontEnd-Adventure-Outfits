import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // For routing
import Authorized from "../../auth/Authorized";
import AdminChecK from "../../auth/AdminChecK";
import { toast } from "react-toastify";
import api from "../../utils/AxiosInstance";

const AdminPanel = () => {
  // Assuming the authorization and admin check functions perform necessary side-effects
  Authorized();
  AdminChecK();

  const [orders, setOrders] = useState();
  const [users, setUsers] = useState();

  const allData = async (req, res) => {
    try {
      const res = await api.get("/admin/dashboard");
      setOrders(res.data.orders);
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
      toast.error("Error in Getting Data");
    }
  };

  useEffect(() => {
    allData();
  }, []);

  return (
    <div className="container-fluid admin-panel-container pt-5">
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
        <div className="col-md-9 col-lg-10 bg-light p-5">
          <h1 className="text-center">Welcome to Admin Panel</h1>
          <p className="text-center">
            Manage your store with the options on the sidebar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
