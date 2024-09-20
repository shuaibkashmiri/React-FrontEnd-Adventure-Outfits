import React from 'react'
import "../styles/loading.scss"
import loading from "../../images/loader.gif"

const Loading = () => {
  return (
    <div className='loading'><h1>
        <img src={loading} alt="" />
        </h1></div>
  )
}

export default Loading