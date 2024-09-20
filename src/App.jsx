import React, { lazy ,Suspense, useState } from "react";
import{BrowserRouter, Routes,Route} from "react-router-dom"
import Index from "./components/publicComponents/Index.jsx";
import Navbar from "./components/sharedComponents/Navbar.jsx";
import Footer from "./components/sharedComponents/Footer.jsx";
import Products from "./components/publicComponents/Products.jsx";
import Loading from "./components/sharedComponents/Loading.jsx";
import Login from "./components/publicComponents/Login.jsx";
import Signup from "./components/publicComponents/Signup.jsx";




const Dashboard =lazy(()=>delay(import("./components/userComponents/Dashboard.jsx")))
const Nopage=lazy(()=>import("./components/adminComponents/Nopage.jsx"))
const AddProducts =lazy(()=>import("./components/adminComponents/AddProducts.jsx"))


async function delay(promise){
  await new Promise((resolve)=>{
    setTimeout(resolve,2000)
  })

  
  return promise
}

const App = () => {
  
  const [change, setChange] = useState(false);
  const [loading,setLoading]=useState(false);
  return (
    <>
     <BrowserRouter>
      <Navbar change={change} setChange={setChange} />
     <Routes>
     <Route path="*" element= {<Nopage/>} />    
          <Route path="/" element= {<Index/>} />
          <Route path="/signup" element= {<Signup/>} />
          <Route path="/login" element= {<Login change={change} setChange={setChange}/> } />
          <Route path="/dashboard" element= {<Suspense fallback={<Loading></Loading>}><Dashboard loading={Loading} setLoading={setLoading}/></Suspense>} />
            <Route path="/addproducts" element={<AddProducts/>}/>
          <Route path="/products" element={<Products/>}/>



 </Routes>
      
      <Footer />
      </BrowserRouter>
      </>
      
  );
}



export default App;



// learn useState