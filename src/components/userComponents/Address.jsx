import React, { useState } from 'react';
import Authorized from '../../auth/Authorized'
import './address.scss';
import api from '../../utils/AxiosInstance';
import { toast, ToastContainer } from 'react-toastify';

const Address = () => {
  Authorized()
  const [mobile, setMobile] = useState();
  const [fullname, setFullname] = useState("");
  const [street, setStreet] = useState("")
  const [landmark,setLandmark]=useState("");
  const [village,setVillage]=useState("");
  const [city,setCity]=useState("")
  const [state,setState]=useState("")
  const [pincode,setPincode]=useState()

  const formData = {
    mobile,fullname,street,village,city,state,pincode,landmark
  }


  const addProduct=async()=>{
    try {
      const res =await api.put("/user/addDetails",formData);
      if(res.data.message === "Delivery Details Updated"){
        toast.success(res.data.message)
      }else{
        toast.error(res.data.message)
      }
      
    } catch (error) {
      console.log(error)
    }
  }




  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    addProduct()
  
  };



  return (
    <div className="main">
      <h1>Update/Add Address</h1>
      <ToastContainer/>
<div className="add-products-container">
      <form className="add-products-form" onSubmit={handleSubmit}>
        <label htmlFor="fullname">Fullname:</label>
        <input
          id="fullname"
          name="fullname"
          value={fullname}
          onChange={(e)=>setFullname(e.target.value)}
          required
        />

<label htmlFor="mobile">Mobile No:</label>
        <input
          type="number"
          id="mobile"
          name="mobile"
          value={mobile}
          onChange={(e)=>setMobile(e.target.value)}
          required
        />

        <label htmlFor="street">Street:</label>
        <input
          id="street"
          name="street"
          value={street}
          onChange={(e)=>{
            setStreet(e.target.value)
          }}
          required
        />
        <label htmlFor="landmark">Landmark:</label>
        <input
          id="landmark"
          name="landmark"
          value={landmark}
          onChange={(e)=>{
            setLandmark(e.target.value)
          }}
          required
        />
       

       <label htmlFor="village">Village:</label>
        <input
          id="village"
          name="village"
          value={village}
          onChange={(e)=>{setVillage(e.target.value)}}
          required
        />

<label htmlFor="city">City:</label>
        <input
          id="city"
          name="city"
          value={city}
          onChange={(e)=>{setCity(e.target.value)}}
          required
        />

        <label htmlFor="state">State:</label>
        <input
          id="state"
          name="state"
          value={state}
          onChange={(e)=>{setState(e.target.value)}}
          required
        />
        <label htmlFor="pincode">Pincode:</label>
        <input
          id="pincode"
          name="pincode"
          value={pincode}
          onChange={(e)=>{setPincode(e.target.value)}}
          required
        />

        <button type="submit" onClick={handleSubmit}>Update</button>
      </form>
    </div>
    </div>
    
  );
};

export default Address;
