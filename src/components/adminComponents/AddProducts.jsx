import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import api from "../../utils/AxiosInstance"; // Assuming this is your API instance for HTTP requests

const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [subCatagory, setSubCatagory] = useState("");
  const [catagory, setCatagory] = useState("");
  const [size, setSize] = useState("");

  const formData = new FormData();

  formData.append("title", title);
  formData.append("image", image);
  formData.append("price", price);
  formData.append("subCatagory", subCatagory);
  formData.append("catagory", catagory);
  formData.append("size", size);
  formData.append("description", description);

  const addProduct = async () => {
    try {
      const res = await api.post("/products/add", formData);
      if (res.data.message === "Product Added SucessFully") {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addProduct();
  };
  return (
    <div className="container-fluid pt-5">
      <div className="row pt-5">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-dark text-white p-4 min-vh-100">
          <h2 className="text-center mb-4 ">Admin Panel</h2>
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
        <div className="col-md-9 col-lg-10 bg-light p-5 ">
          <h1 className="text-center mb-4">Add New Product</h1>
          <form>
            <div className="mb-3">
              <label className="form-label" htmlFor="title">
                Product Name
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                placeholder="Enter product name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                className="form-control"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                id="price"
                className="form-control"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="Catagory">
                Category
              </label>
              <input
                type="text"
                id="category"
                className="form-control"
                placeholder="Enter Catagory"
                value={catagory}
                onChange={(e) => setCatagory(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="subCatagory">
                Sub Catagory
              </label>
              <input
                type="text"
                id="subCatagory"
                className="form-control"
                placeholder="Enter Sub Category"
                value={subCatagory}
                onChange={(e) => setSubCatagory(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="size">
                Enter Sizes
              </label>
              <input
                type="text"
                id="size"
                className="form-control"
                placeholder="Enter Sizes"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="image">
                Product Image
              </label>
              <input
                type="file"
                id="image"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={handleSubmit}
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
