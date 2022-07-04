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

function Consumer({ userid }) {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetchCartItems();
  }, [userid]);

  // useEffect(() => {
  //   fetchCartItems();
  // }, []);

  async function fetchCartItems() {
    if (userid) {
      let res = await fetch(`http://localhost:3000/Cart?uid=${userid}`);
      let cart = await res.json();
      setCartItems(cart);
    } else {
      let cart = localStorage.getItem("cart");
      if (cart) {
        let cartItems = [];
        cart = cart.split(",");
        let cartLen = cart.length;
        let noOfFetcheditems = 0;
        cart.forEach((item) => {
          let values = item.split("-");
          let cat = values[0];
          let subcat = values[1];
          let itemId = values[2];
          let cartCount = Number(values[3]);
          fetch(`http://localhost:3000/${cat}-${subcat}?id=${itemId}`)
            .then((res) => res.json())
            .then((data) => {
              data[0].cartCount = cartCount;
              cartItems.push(...data);
              noOfFetcheditems += 1;
              if (cartLen === noOfFetcheditems) setCartItems(cartItems);
            });
        });
      } else {
        setCartItems([]);
      }
    }
  }
  return (
    <main className="sans-serif overflow-hidden">
      <CartContext.Provider value={cartItems}>
        <Navbar user={userid} admin={false} />
        <Routes>
          <Route
            path="/cart"
            element={
              <Cart loginStatus={!!userid} fetchCartHandler={fetchCartItems} />
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

export default Consumer;
