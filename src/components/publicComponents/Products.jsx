import React, { useEffect, useState } from 'react';
import "../styles/products.scss";
import { toast } from 'react-toastify';
import api from '../../utils/AxiosInstance';

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
      toast.success(data.message);
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
      <h1>New Arrivals!</h1>
      <div className="main">
        {products.slice(-3).map((product) => (
          <div className='product' key={product._id}>
            <div className='image'>
              <img src={product.imageUrl} alt={product.title} />
            </div>
            <div className='product-info'>
              <p className='title'>{product.title}</p>
              <p className='category'>{product.category}</p>
              <p className='size'>
                Available Sizes:
                <select onChange={(e) => setSize(e.target.value)}>
                  {product.size.split(",").map((sizeOption, index) => (
                    <option key={index} value={sizeOption}>
                      {sizeOption}
                    </option>
                  ))}
                </select>
              </p>
              <span>Select Quantity:</span>
              <select onChange={(e) => setQuantity(e.target.value)} value={quantity}>
                {[1, 2, 3].map((qty) => (
                  <option key={qty} value={qty}>{qty}</option>
                ))}
              </select>
              <p className='price'>₹ {product.price}</p>
              <button onClick={() => addToCart(product._id)}>Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
