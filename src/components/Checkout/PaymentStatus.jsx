import { useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../Modals/Loading.jsx";
import CartContext from "../Cart/CartContext.jsx";
import SuccessIcon from "../../images/correct.png";
import FailureIcon from "../../images/warning.png";
import fetchBillingAddress from "../../data/fetchBillingAddress.jsx";
function PaymentStatus({ clearSessionHandler, fetchCartHandler }) {
  const stripe = useStripe();
  const [message, setMessage] = useState(1);
  const [orderStatus, setOrderStatus] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cartItems = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => getStatus(), [stripe]);
  useEffect(() => {
    if (!orderPlaced && orderStatus && cartItems.length) placeOrder();
  }, [orderStatus, cartItems]);

  function getStatus() {
    if (!stripe) return;

    const client_secret = searchParams.get("payment_intent_client_secret");

    stripe.retrievePaymentIntent(client_secret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setOrderStatus(true);
          break;
        case "processing":
          setMessage(1);
          break;
        case "requires_payment_method":
          setMessage(2);
          break;
        default:
          setMessage(-1);
          break;
      }
    });
  }

  async function placeOrder() {
    setOrderPlaced(true);
    let addressObject = await fetchBillingAddress();
    let updatedItems = addCurrentDateAndAddressToItems(addressObject);
    Promise.all(
      updatedItems.map((item) =>
        fetch(`${process.env.REACT_APP_MOCKBACKEND}/Orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Transfer-Encoding": "gzip",
          },
          body: JSON.stringify({
            item,
            tokenId: sessionStorage.getItem("tokenId"),
          }),
        })
      )
    ).then(() => decreaseProductCount());
  }

  // async function fetchUserAddress() {
  //   let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Address`, {
  //     headers: {
  //       "Transfer-Encoding": "gzip",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
  //     },
  //   });
  //   let address = await res.json();

  //   return address.details;
  // }
  function addCurrentDateAndAddressToItems(addressObject) {
    let dateOrdered = new Date();
    let items = cartItems.map((item) => {
      return {
        ...item,
        productId: item.id,
        id: Date.now() + item.id,
        orderDate: dateOrdered,
        userName: addressObject.name,
        phoneNo: addressObject.phoneNo,
        address:
          addressObject.deliveryAddress +
          "," +
          addressObject.city +
          "," +
          addressObject.state +
          "," +
          addressObject.pinCode,
      };
    });

    return items;
  }

  function decreaseProductCount() {
    Promise.all(
      cartItems.map((item) => {
        let updatedItemCount;
        if (Number(item.count) - Number(item.cartCount) === 0) {
          updatedItemCount = {
            count: `${Number(item.count) - Number(item.cartCount)}`,
            status: false,
          };
        } else {
          updatedItemCount = {
            count: `${Number(item.count) - Number(item.cartCount)}`,
            status: item.status,
          };
        }
        return fetch(
          `${process.env.REACT_APP_MOCKBACKEND}/${item.cat
            .split(" ")
            .join("-")}/${item.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Transfer-Encoding": "gzip",
            },
            body: JSON.stringify({
              cartCount: updatedItemCount,
              tokenId: sessionStorage.getItem("tokenId"),
            }),
          }
        );
      })
    )
      .then(() => refreshCart())
      .catch((err) => console.log(err));
  }

  function refreshCart() {
    Promise.all(
      cartItems.map((item) =>
        fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart/${item.id}`, {
          method: "DELETE",
          headers: {
            "Transfer-Encoding": "gzip",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tokenId: sessionStorage.getItem("tokenId") }),
        })
      )
    ).then(() => {
      fetchCartHandler();
      clearSessionHandler();
      setMessage(0);
    });
  }

  if (message === 0) {
    return (
      <article className="w-100 vh-100 flex flex-column justify-center items-center">
        <section>
          <h3>Payment Succeeded!</h3>
          <img src={SuccessIcon} alt="success" className="w2 h2" />
        </section>
        <Link to="/">
          <button className="btn white bg-purple pa2">Continue Shopping</button>
        </Link>
      </article>
    );
  } else if (message === 1) {
    return (
      <article className="w-100 vh-100 flex flex-column justify-center items-center">
        <h3>Payment processing... </h3>
        <Loading />
      </article>
    );
  } else if (message === 2) {
    setTimeout(() => navigate("/"), 4000);
    return (
      <article className="w-100 vh-100 flex flex-column justify-center items-center">
        <section>
          <h3>Payment failed. Please try another payment method</h3>
          <img src={FailureIcon} alt="Payment failed" />
        </section>
        <h4>Redirecting to home page...</h4>
      </article>
    );
  } else if (message === -1) {
    return (
      <article className="w-100 vh-100 flex flex-column justify-center items-center">
        <h3>Something went wrong. Please try again later</h3>
        <img src={FailureIcon} alt="payment failed" />
      </article>
    );
  }
}

export default PaymentStatus;
