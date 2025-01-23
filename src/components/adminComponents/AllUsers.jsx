import React, { useEffect, useState } from "react";
import api from "../../utils/AxiosInstance";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  // Function to fetch users data
  const userData = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      if (res.data && res.data.users) {
        setUsers(res.data.users); // Assuming response contains the users array
      } else {
        toast.error("No users data found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in Getting Data");
    }
  };

  useEffect(() => {
    userData();
  }, []);

  // Optional: Log users whenever they change
  useEffect(() => {
    console.log(users);
  }, [users]);

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
        <div className="col-md-9 col-lg-10 bg-light p-5">
          <h1 className="text-center mb-4">All Users</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th> {/* Column for address dropdown */}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {/* Dropdown for user address */}
                    {user.addresses && user.addresses.length > 0 ? (
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          id={`dropdown-${user._id}`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          View Address
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby={`dropdown-${user._id}`}
                        >
                          <li>
                            <div className="dropdown-item">
                              <strong>Full Name:</strong>{" "}
                              {user.addresses[0].fullname}
                            </div>
                          </li>
                          <li>
                            <div className="dropdown-item">
                              <strong>Street:</strong>{" "}
                              {user.addresses[0].street}
                            </div>
                          </li>
                          <li>
                            <div className="dropdown-item">
                              <strong>City:</strong> {user.addresses[0].city}
                            </div>
                          </li>
                          <li>
                            <div className="dropdown-item">
                              <strong>State:</strong> {user.addresses[0].state}
                            </div>
                          </li>
                          <li>
                            <div className="dropdown-item">
                              <strong>Pincode:</strong>{" "}
                              {user.addresses[0].pincode}
                            </div>
                          </li>
                          <li>
                            <div className="dropdown-item">
                              <strong>Landmark:</strong>{" "}
                              {user.addresses[0].landmark}
                            </div>
                          </li>
                          <li>
                            <div className="dropdown-item">
                              <strong>Village:</strong>{" "}
                              {user.addresses[0].village}
                            </div>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <p>No Address Available</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
