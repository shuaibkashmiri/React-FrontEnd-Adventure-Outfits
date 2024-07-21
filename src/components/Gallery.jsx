import React, { useState } from 'react'
import "../styles/Gallery.css"
import Card from './sharedComponents/Cards'
import { useEffect } from 'react'


const Gallery = () => {
  const [photos,setPhotos]=useState([])
  const [query,setquery]=useState('india');
const [loading ,setloading]=useState(false)
  const handleClick=()=>{
    setloading(!loading)
  }
  //Getting Images from Pexels

  const getImages = async(query)=>{
    try {
      const res =await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=80`,{method:'GET',headers:{Authorization:'AR6IwmyLUc6VPbxRqnJxtBmOpsQfzjpfaDqapwEIrsdJkj1Taf6DaZcw'}});

      const data =await res.json();
      console.log(data.photos);
      setPhotos(data.photos);
      
    } catch (error) {
     console.log(error) 
    }
  }
useEffect(()=>{
  getImages(query)
},[loading])

  return (
    <div className="services">
    <h1> My Gallery</h1>
    <input type="text" placeholder='enter search' value={query} onChange={(e)=>{setquery(e.target.value)}}/>
    <button onClick={handleClick}>search</button>

<div className="cards">
  {photos.map((el)=><Card id={el.id} src={el.src.medium} auth={el.photographer}/>)}
  
  
 
</div>
</div>


       
  )
}

export default Gallery