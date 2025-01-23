import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/sharedComponents/Navbar.jsx";
import Footer from "./components/sharedComponents/Footer.jsx";
import Loading from "./components/sharedComponents/Loading.jsx";

import Index from "./components/publicComponents/Index.jsx";
import Signup from "./components/publicComponents/Signup.jsx";
import Login from "./components/publicComponents/Login.jsx";
import Products from "./components/publicComponents/Products.jsx";
import Men from "./components/publicComponents/Men.jsx";
import Women from "./components/publicComponents/Women.jsx";
import Cart from "./components/userComponents/Cart.jsx";
import Address from "./components/userComponents/Address.jsx";
import CheckoutPage from "./components/userComponents/Checkout.jsx";

// Admin Components (Lazy Loaded)
const AdminPanel = lazy(() =>
  import("./components/adminComponents/AdminPanel")
);
const AddProducts = lazy(() =>
  import("./components/adminComponents/AddProducts")
);
const AllOrders = lazy(() => import("./components/adminComponents/AllOrders"));
const AllUsers = lazy(() => import("./components/adminComponents/AllUsers"));
const Nopage = lazy(() => import("./components/adminComponents/Nopage"));

// Lazy loading Dashboard
const Dashboard = lazy(() =>
  import("./components/userComponents/Dashboard.jsx")
);

async function delay(promise) {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000); // Simulate delay for lazy loading
  });
  return promise;
}

const App = () => {
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <Navbar change={change} setChange={setChange} />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<Login change={change} setChange={setChange} />}
          />
          <Route path="/products" element={<Products />} />
          <Route
            path="/men"
            element={
              <Suspense fallback={<Loading />}>
                <Men />
              </Suspense>
            }
          />
          <Route
            path="/women"
            element={
              <Suspense fallback={<Loading />}>
                <Women />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<Loading />}>
                <Cart />
              </Suspense>
            }
          />
          <Route path="/user/address" element={<Address />} />
          <Route path="/user/checkout" element={<CheckoutPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <Suspense fallback={<Loading />}>
                <AdminPanel />
              </Suspense>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <Suspense fallback={<Loading />}>
                <AddProducts />
              </Suspense>
            }
          />
          <Route
            path="/admin/all-orders"
            element={
              <Suspense fallback={<Loading />}>
                <AllOrders />
              </Suspense>
            }
          />
          <Route
            path="/admin/all-users"
            element={
              <Suspense fallback={<Loading />}>
                <AllUsers />
              </Suspense>
            }
          />

          {/* User Dashboard */}
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <Dashboard loading={loading} setLoading={setLoading} />
              </Suspense>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<Nopage />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
