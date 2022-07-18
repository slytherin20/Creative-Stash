import { useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../Modals/Loading.jsx";
//import { getAuth, onAuthStateChanged } from "firebase/app";
import SuccessIcon from "../../images/correct.png";
import FailureIcon from "../../images/warning.png";
//import orderPlaced from "../../data/orderPlaced.jsx";
function PaymentStatus() {
  const stripe = useStripe();
  const [message, setMessage] = useState(1);
  //   const [uid, setUid] = useState(null);
  //const auth = getAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  //   onAuthStateChanged(auth, (user) => {
  //     if (user) setUid(user.uid);
  //   });

  function getStatus() {
    if (!stripe) return;

    const client_secret = searchParams.get("payment_intent_client_secret");

    stripe.retrievePaymentIntent(client_secret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage(0);
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
  useEffect(() => getStatus(), [stripe]);

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
    setTimeout(() => navigate("/payment-gatway"), 4000);
    return (
      <article>
        <section>
          <h3>Payment failed. Please try another payment method</h3>
          <img src={FailureIcon} alt="Payment failed" />
        </section>
        <h4>Redirecting to payment gateway...</h4>
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
