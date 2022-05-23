import Navbar from "./Header/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import MainPage from "../components/Home Page/MainPage.jsx";
import ShowAllProducts from "./ProductPage/ShowAllProducts.jsx";
import ShowProducts from "./ProductPage/ShowProducts.jsx";
import Cart from "./Cart/Cart.jsx";
import NotFound from "./NotFound.jsx";
import CartContext from "./Cart/CartContext.jsx";
import { useState, useEffect } from "react";
import SingleProduct from "./ProductPage/SingleProduct.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase_config.js";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    console.log(user);
    fetchCartItems();
  }, [user]);

  async function fetchCartItems() {
    if (user) {
      console.log(user);
      let res = await fetch("http://localhost:3000/Cart");
      let cart = await res.json();
      setCartItems(cart);
    } else {
      //Handle anonymous guest case
    }
  }
  return (
    <main className="sans-serif overflow-hidden">
      <CartContext.Provider value={cartItems}>
        <Navbar user={user} />
        <Routes>
          <Route
            path="/cart"
            element={
              <Cart loginStatus={false} fetchCartHandler={fetchCartItems} />
            }
          />
          <Route
            exact
            path="/"
            element={<MainPage fetchCartHandler={fetchCartItems} />}
          />
          <Route
            path="/products/product"
            element={<SingleProduct fetchCartHandler={fetchCartItems} />}
          />
          <Route
            path="/products/:id"
            element={<ShowAllProducts fetchCartHandler={fetchCartItems} />}
          />
          <Route
            path="/products/Paints/:id"
            element={<ShowProducts fetchCartHandler={fetchCartItems} />}
          />
          <Route
            path="/products/Painting-Medium/:id"
            element={<ShowProducts fetchCartHandler={fetchCartItems} />}
          />
          <Route
            path="/products/Canvas/:id"
            element={<ShowProducts fetchCartHandler={fetchCartItems} />}
          />
          <Route
            path="/products/Brushes/:id"
            element={<ShowProducts fetchCartHandler={fetchCartItems} />}
          />
          <Route
            path="/products/Pens-and-Markers/:id"
            element={<ShowProducts fetchCartHandler={fetchCartItems} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartContext.Provider>
    </main>
  );
}

export default App;
