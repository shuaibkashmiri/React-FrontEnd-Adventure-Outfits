import React, { useEffect, useState } from 'react'
import "../styles/cart.scss"
import Authorized from '../../auth/Authorized'
import api from '../../utils/AxiosInstance'
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';

const Cart = () => {
    Authorized()
    const [products,setProducts]=useState([]);
    const [cartTotal,setCartTotal]=useState(0);
    const cartItems=async()=>{
        try {
            const res=await api.get("/products/getcart")
            setProducts(res.data.getUser.cart)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUserData = async () => {
      try {
        const { data } = await api.get("/user/userdetails");
        setCartTotal(data.message.userdetails.cartValue);
      } catch (error) {
        console.error(error);
      }
    };

    const deleteCartItem=async(productId)=>{
try {
  const res = await api.get(`/products/removeItem/${productId}`)
  
} catch (error) {
  console.log(error)
}
    }

    useEffect(()=>{
        cartItems()
        fetchUserData()
    },[cartTotal,products])
  return (
    <>
    
    <div className="main">
   {cartTotal !== 0 ?  <h1 className='cart-heading'>Items in Cart</h1> : <h1 className='cart-heading'>No Items In Cart</h1>}
    {products&&products.map((item)=><div className="cart-item">
      <img src={item.productId.imageUrl} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.productId.title}</h3>   
        
        <p>Size: {item.size}</p>
        <p>Quantity: {item.quantity}</p>
        <p>₹{item.price}</p>
        
      </div>
      
      <MdDeleteForever className='del' onClick={()=>deleteCartItem(item.productId._id)}/>
    </div>)}
   {cartTotal !==0 && <p>Total : ₹{cartTotal}</p>}

   {cartTotal !==0 && <button className='btn'>Proceed</button>}
    
</div>
    </>
  )
}

export default Cart