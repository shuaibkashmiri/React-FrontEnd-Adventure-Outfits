import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../utils/AxiosInstance";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/products/getAll");
      setProducts(data.newProducts);
    } catch (error) {
      toast.error("Failed to fetch products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      await api.post(`/products/addtocart/${productId}`, { quantity, size });
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="container my-5">
        <h1 className="text-center mb-4">New Arrivals!</h1>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {products.slice(-3).map((product) => (
              <div className="col-md-4" key={product._id}>
                <div className="card h-100 shadow-sm">
                  {/* Uniform Image */}
                  <div className="card-img-top-container">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="card-img-top"
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text text-muted">{product.category}</p>
                    <div className="mb-3">
                      <label className="form-label">Available Sizes:</label>
                      <select
                        className="form-select"
                        onChange={(e) => setSize(e.target.value)}
                        defaultValue=""
                      >
                        <option disabled value="">
                          Select Size
                        </option>
                        {product.size.split(",").map((sizeOption, index) => (
                          <option key={index} value={sizeOption}>
                            {sizeOption}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Select Quantity:</label>
                      <select
                        className="form-select"
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                      >
                        {[1, 2, 3].map((qty) => (
                          <option key={qty} value={qty}>
                            {qty}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="fw-bold text-primary mt-auto">
                      ₹ {product.price}
                    </p>
                    <button
                      className="btn btn-primary w-100 mt-2"
                      onClick={() => addToCart(product._id)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
