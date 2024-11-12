import React, { useEffect, useState } from 'react'
import "../styles/men.scss"
import api from "../../utils/AxiosInstance"
import { Link } from 'react-router-dom'
const Men = () => {
  const [menCatagory , setMenCatagory]=useState()
const getMenCatagory=async ()=>{
 
  try {
    const res =await api.get("/products/men");
    setMenCatagory(res.data.products)
  } catch (error) {
    console.log(error)
  }
}


useEffect(()=>{
  getMenCatagory()
},[])

  return (
    <>
    <div className="main">
      {/* <div className="headings">
        <ul>
          <li><Link>WaterProof Jackets</Link></li>
          <li><Link>T-shirt/BaseLayers</Link></li>
          <li><Link>Trekking Pants</Link></li>
          <li><Link>Shoes</Link></li>
          <li><Link>Acessiories</Link></li>
          



        </ul>
      </div> */}
      <div className="card">
      {menCatagory&&menCatagory.map((products)=><div className='product'>
   <div className='image'>
   <img src={products.imageUrl} alt="" />
   </div>
   <div className='product-info'>
    <p className='title'>{products.title}</p>
    <p className='catagory'>{products.catagory}</p>
    <p className='size'>Available Sizes {products.size}</p>
    <p className='price'>₹ {products.price}</p>

    <button>Add To Cart</button>
   </div>
</div>)}
      </div>
  
    </div>
    </>
  )
}

export default Men