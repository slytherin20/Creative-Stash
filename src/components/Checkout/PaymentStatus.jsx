import { useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../Modals/Loading.jsx";
import CartContext from "../Cart/CartContext.jsx";
//import { getAuth, onAuthStateChanged } from "firebase/app";
import SuccessIcon from "../../images/correct.png";
import FailureIcon from "../../images/warning.png";
//import orderPlaced from "../../data/orderPlaced.jsx";
function PaymentStatus({ clearSessionHandler, fetchCartHandler }) {
  const stripe = useStripe();
  const [message, setMessage] = useState(1);
  const [orderStatus, setOrderStatus] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cartItems = useContext(CartContext);
  //   const [uid, setUid] = useState(null);
  //const auth = getAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => getStatus(), [stripe]);
  useEffect(() => {
    if (!orderPlaced && orderStatus && cartItems.length) placeOrder();
  }, [orderStatus, cartItems]);
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) setUid(user.uid);
  //   });

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
    let addressObject = await fetchUserAddress(cartItems[0].uid);
    let updatedItems = addCurrentDateAndAddressToItems(addressObject);
    Promise.all(
      updatedItems.map((item) =>
        fetch("http://localhost:3000/Orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        })
      )
    ).then(() => decreaseProductCount());
  }

  async function fetchUserAddress(uid) {
    let res = await fetch(`http://localhost:3000/Address?id=${uid}`);
    let address = await res.json();

    return address[0];
  }
  function addCurrentDateAndAddressToItems(addressObject) {
    let dateOrdered = new Date();
    let items = cartItems.map((item) => {
      return {
        ...item,
        productId: item.id,
        id: Date.now(),
        orderDate: dateOrdered,
        name: addressObject.name,
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
        let updatedItemCount = {
          ...item,
          count: Number(item.count) - item.cartCount,
        };
        return fetch(
          `http://localhost:3000/${item.cat.split(" ").join("_")}-${item.subcat
            .split(" ")
            .join("_")}/${item.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedItemCount),
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
        fetch(`http://localhost:3000/Cart/${item.id}`, {
          method: "DELETE",
        })
      )
    ).then(() => {
      fetchCartHandler();
      clearSessionHandler();
      setMessage(0);
    });
  }

  if (message === 0) {
    // orderPlaced(uid);
    //payment succeeded
    return (
      <article>
        <section>
          <h3>Payment Succeeded!</h3>
          <img src={SuccessIcon} alt="success" className="w2 h2" />
        </section>
        <Link to="/">
          <button>Continue Shopping</button>
        </Link>
      </article>
    );
  } else if (message === 1) {
    return (
      <article>
        <h3>Payment processing... </h3>
        <Loading />
      </article>
    );
  } else if (message === 2) {
    setTimeout(() => navigate("/"), 4000);
    return (
      <article>
        <section>
          <h3>Payment failed. Please try another payment method</h3>
          <img src={FailureIcon} alt="Payment failed" />
        </section>
        <h4>Redirecting to home page...</h4>
      </article>
    );
  } else if (message === -1) {
    return (
      <article>
        <h3>Something went wrong. Please try again later</h3>
        <img src={FailureIcon} alt="payment failed" />
      </article>
    );
  }
}

export default PaymentStatus;
