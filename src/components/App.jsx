import Navbar from "./Header/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import MainPage from "../components/Home Page/MainPage.jsx";
import ShowAllProducts from "./ProductPage/ShowAllProducts.jsx";
import ShowProducts from "./ProductPage/ShowProducts.jsx";
import Cart from "./Cart/Cart.jsx";
import NotFound from "./NotFound.jsx";
import CartContext from "./Cart/CartContext.jsx";
import { useState, useEffect } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetchCartItems();
  }, []);
  async function fetchCartItems() {
    let res = await fetch("http://localhost:3000/Cart");
    let cart = await res.json();
    setCartItems(cart);
  }
  return (
    <main className="sans-serif overflow-hidden">
      <CartContext.Provider value={cartItems}>
        <Navbar />
        <Routes>
          <Route
            path="/cart"
            element={
              <Cart loginStatus={false} fetchCartHandler={fetchCartItems} />
            }
          />
          <Route exact path="/" element={<MainPage />} />
          <Route path="/products/:id" element={<ShowAllProducts />} />
          <Route path="/products/Paints/:id" element={<ShowProducts />} />
          <Route
            path="/products/Painting-Medium/:id"
            element={<ShowProducts />}
          />
          <Route path="/products/Canvas/:id" element={<ShowProducts />} />
          <Route path="/products/Brushes/:id" element={<ShowProducts />} />
          <Route
            path="/products/Pens-and-Markers/:id"
            element={<ShowProducts />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartContext.Provider>
    </main>
  );
}

export default App;
