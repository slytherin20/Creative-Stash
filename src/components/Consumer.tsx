import Navbar from "./Header/Navbar";
import { Routes, Route } from "react-router-dom";
import MainPage from "./Home Page/MainPage";
import ShowAllProducts from "./ProductPage/ShowAllProducts";
import ShowProducts from "./ProductPage/ShowProducts";
import PaymentStatus from "./Checkout/PaymentStatus";
import Cart from "./Cart/Cart";
import NotFound from "./NotFound";
import CartContext from "./Cart/CartContext";
import { useState, useEffect, useContext } from "react";
import SingleProduct from "./ProductPage/SingleProduct";
import AddBillingAddress from "./BillingAddress/AddBillingAddress";
import DisplayBillingAddress from "./BillingAddress/DisplayBillingAddress";
import CheckoutForm from "./Checkout/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ShowOrders from "./Order/ShowOrders";
import OrderItemDetails from "./Order/OrderItemDetails";
import Wishlist from "./Wishlist/Wishlist";
import AllSearchResults from "./ProductPage/AllSearchResults";
import SearchByBrand from "./ProductPage/SearchByBrand";
import Loading from "./Modals/Loading";
import { AuthContext } from "./App";
import { CartDoc, CartItem, Product } from "../interfaces/app_interface";

const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY || '');

function Consumer() {
  const userid = useContext(AuthContext);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [options, setOptions] = useState({ clientSecret: "" });

  useEffect(() => {
    fetchCartItems();
  }, [userid]);

  useEffect(() => fetchSecretKey(), []);

  function fetchSecretKey() {
    let paymentIntentId = localStorage.getItem("pid");
    if (paymentIntentId) {
      if (options.clientSecret) return;
      else {
        fetch(`${process.env.REACT_APP_URI}/secret`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Transfer-Encoding": "gzip",
          },
          body: JSON.stringify({ pid: paymentIntentId }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) =>
            setOptions({ ...options, clientSecret: data.client_secret })
          )
          .catch(() => {
            console.log("Server Connection Error. Connecting Again...");
            // fetchSecretKey();
          });
      }
    } else {
      fetch(`${process.env.REACT_APP_URI}/create-intent`)
        .then((res) => {
          return res.json();
        })
        .then((key) => {
          localStorage.setItem("pid", key.paymentIntentId);
          setOptions({ ...options, clientSecret: key.client_secret });
        })
        .catch(() => {
          console.log("Server Connection Error. Connecting again...");
          // fetchSecretKey();
        });
    }
  }

  function clearSessionStorage() {
    localStorage.removeItem("pid");
    fetchSecretKey();
  }

  async function fetchCartItems() {
    if (userid) {
      let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart`, {
        headers: {
          "Transfer-Encoding": "gzip",
          Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
        },
      });
      let cart:CartDoc = await res.json();
      if (cart) setCartItems(cart.cart);
    } else {
      let cart = localStorage.getItem("cart");
      if (cart) {
        let cartItems:CartItem[] = [];
        let cartArr:string[] = cart.split(",");
        let cartLen:number = cartArr.length;
        let noOfFetcheditems:number = 0;
        cartArr.forEach((item) => {
          let values = item.split("|");
          let cat = values[0];
          let itemId = values[2];
          let cartCount = Number(values[3]);
          fetch(`${process.env.REACT_APP_MOCKBACKEND}/${cat}/${itemId}`, {
            headers: {
              "Transfer-Encoding": "gzip",
            },
          })
            .then((res) => res.json())
            .then((data:Product) => {
              let item:CartItem={
                ...data,
                cartCount: cartCount
              }
              cartItems.push(item);
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
        <Navbar admin={false} userid={null} />
        <Routes>
          <Route
            path="/cart"
            element={
              <Cart loginStatus={!!userid} fetchCartHandler={fetchCartItems} />
            }
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
          <Route path="/add-billing-address" element={<AddBillingAddress />} />
          <Route
            path="/billing-details"
            element={<DisplayBillingAddress width={100} />}
          />
          <Route path="/orders" element={<ShowOrders />} />
          <Route
            path="/payment-gateway"
            element={
              options.clientSecret ? (
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm />
                </Elements>
              ) : (
                <Loading />
              )
            }
          />
          <Route
            path="/payment-status"
            element={
              stripePromise ? (
                <Elements stripe={stripePromise}>
                  <PaymentStatus
                    clearSessionHandler={clearSessionStorage}
                    fetchCartHandler={fetchCartItems}
                  />
                </Elements>
              ) : (
                <Loading />
              )
            }
          />
          <Route path="/order-details/:id" element={<OrderItemDetails />} />
          <Route
            path="/wishlist"
            element={<Wishlist fetchCartHandler={fetchCartItems} />}
          />
          <Route
            path="/search"
            element={<AllSearchResults fetchCartHandler={fetchCartItems} />}
          />
          <Route
            path="/products/brands"
            element={<SearchByBrand fetchCartHandler={fetchCartItems} />}
          />
            <Route
            path="/"
            element={<MainPage  />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartContext.Provider>
    </main>
  );
}

export default Consumer;
