import Navbar from "./Header/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import MainPage from "../components/Home Page/MainPage.jsx";
import ShowAllProducts from "./ProductPage/ShowAllProducts.jsx";
import ShowProducts from "./ProductPage/ShowProducts.jsx";
import PaymentStatus from "./Checkout/PaymentStatus.jsx";
import Cart from "./Cart/Cart.jsx";
import NotFound from "./NotFound.jsx";
import CartContext from "./Cart/CartContext.jsx";
import { useState, useEffect } from "react";
import SingleProduct from "./ProductPage/SingleProduct.jsx";
import AddBillingAddress from "./BillingAddress/AddBillingAddress.jsx";
import DisplayBillingAddress from "./BillingAddress/DisplayBillingAddress.jsx";
import CheckoutForm from "./Checkout/CheckoutForm.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ShowOrders from "./Order/ShowOrders.jsx";
import OrderItemDetails from "./Order/OrderItemDetails.jsx";
import Wishlist from "./Wishlist/Wishlist.jsx";
import AllSearchResults from "./ProductPage/AllSearchResults.jsx";
import SearchByBrand from "./ProductPage/SearchByBrand.jsx";
import Loading from "./Modals/Loading.jsx";

const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);

function Consumer({ userid }) {
  const [cartItems, setCartItems] = useState([]);
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
        fetch(
          `${
            process.env.NODE_ENV == "production"
              ? process.env.REACT_APP_URI
              : "http://localhost"
          }:5000/secret`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Transfer-Encoding": "chunked",
            },
            body: JSON.stringify({ pid: paymentIntentId }),
          }
        )
          .then((res) => {
            return res.json();
          })
          .then((data) =>
            setOptions({ ...options, clientSecret: data.client_secret })
          )
          .catch(() => {
            console.log("Server Connection Error. Connecting Again...");
            fetchSecretKey();
          });
      }
    } else {
      fetch(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URI
            : "http://localhost"
        }:5000/create-intent`,
        {
          headers: {
            "Transfer-Encoding": "chunked",
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((key) => {
          localStorage.setItem("pid", key.paymentIntentId);
          setOptions({ ...options, clientSecret: key.client_secret });
        })
        .catch(() => {
          console.log("Server Connection Error. Connecting again...");
          fetchSecretKey();
        });
    }
  }

  function clearSessionStorage() {
    localStorage.removeItem("pid");
    fetchSecretKey();
  }

  async function fetchCartItems() {
    if (userid) {
      let res = await fetch(
        `${
          process.env.NODE_ENV == "production"
            ? process.env.REACT_APP_URI
            : "http://localhost"
        }:3000/Cart?uid=${userid}`,
        {
          headers: {
            "Transfer-Encoding": "chunked",
          },
        }
      );
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
          fetch(
            `${
              process.env.NODE_ENV == "production"
                ? process.env.REACT_APP_URI
                : "http://localhost"
            }:3000/${cat}-${subcat}?id=${itemId}`,
            {
              headers: {
                "Transfer-Encoding": "chunked",
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              data[0].cartCount = Number(cartCount);
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartContext.Provider>
    </main>
  );
}

export default Consumer;
