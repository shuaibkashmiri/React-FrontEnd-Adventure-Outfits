import React, { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../utils/AxiosInstance";

const Women = () => {
  const [womenCategory, setWomenCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({}); // Track quantity and size for each product

  const fetchWomenCategory = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/products/women");
      setWomenCategory(res.data.products);

      // Initialize default values for quantity and size for each product
      const initialOptions = {};
      res.data.products.forEach((product) => {
        initialOptions[product._id] = { size: "", quantity: 1 };
      });
      setSelectedOptions(initialOptions);
    } catch (error) {
      toast.error("Failed to fetch women's category");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSizeChange = (productId, size) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], size },
    }));
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], quantity },
    }));
  };

  const addToCart = async (productId) => {
    const { size, quantity } = selectedOptions[productId];
    if (!size) {
      toast.error("Please select a size!");
      return;
    }

    try {
      await api.post(`/products/addtocart/${productId}`, { size, quantity });
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWomenCategory();
  }, [fetchWomenCategory]);

  return (
    <>
      <ToastContainer />
      <div className="container my-5" style={{ marginTop: "70px" }}>
        <h1 className="text-center mb-4">Women's Collection</h1>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : womenCategory.length === 0 ? (
          <div className="text-center">
            <p>No products available in this category.</p>
          </div>
        ) : (
          <div className="row g-4">
            {womenCategory.map((product) => (
              <div className="col-md-4" key={product._id}>
                <div className="card h-100 shadow-sm">
                  {/* Product Image */}
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
                      <label
                        htmlFor={`size-${product._id}`}
                        className="form-label"
                      >
                        Select Size:
                      </label>
                      <select
                        id={`size-${product._id}`}
                        className="form-select"
                        value={selectedOptions[product._id]?.size || ""}
                        onChange={(e) =>
                          handleSizeChange(product._id, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Choose size
                        </option>
                        {product.size.split(",").map((sizeOption, index) => (
                          <option key={index} value={sizeOption}>
                            {sizeOption}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor={`quantity-${product._id}`}
                        className="form-label"
                      >
                        Select Quantity:
                      </label>
                      <select
                        id={`quantity-${product._id}`}
                        className="form-select"
                        value={selectedOptions[product._id]?.quantity || 1}
                        onChange={(e) =>
                          handleQuantityChange(product._id, e.target.value)
                        }
                      >
                        {[1, 2, 3, 4, 5].map((qty) => (
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

export default Women;
