import DisplayBillingAddress from "../BillingAddress/DisplayBillingAddress.jsx";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { TailSpin } from "react-loader-spinner";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import CartContext from "../Cart/CartContext.jsx";
import ErrorPage from "../Modals/ErrorPage.jsx";
import Modal from "../Modals/Modal.jsx";
function CheckoutForm() {
  const [amt, setAmt] = useState(0);
  const [error, setErrorMessage] = useState(null);
  const [popupStatus, setPopupStatus] = useState(false);
  const [showPayBtn, setShowPayBtn] = useState(false);
  const elements = useElements();
  const stripe = useStripe();
  // const auth = getAuth();
  const cartItems = useContext(CartContext);

  // onAuthStateChanged(auth, (user) => setUid(user.uid));

  useEffect(() => sendCartItemsToServer(), [cartItems]);

  function sendCartItemsToServer() {
    let res = cartItems.reduce((acc, obj) => {
      let addition = acc + Number(obj.price) * Number(obj.cartCount);
      return addition;
    }, 50);
    setAmt(res);
    let paymentIntentId = localStorage.getItem("pid");
    fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: res, paymentIntentId: paymentIntentId }),
    })
      .then((res) => {
        if (!res.ok) Promise.reject();
        else setShowPayBtn(true);
      })
      .catch((err) => console.log(err));
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (!elements || !stripe) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:1234/payment-status",
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setPopupStatus(true);
    } else {
      setErrorMessage(null);
      setPopupStatus(false);
    }
  }

  function closePopup() {
    setPopupStatus(false);
  }
  return (
    <article className="flex w-100">
      <DisplayBillingAddress width={50} />
      <div className="mt3">
        <p className="red tc">{error}</p>
        <form className="w-40 h-100 pa4 w-100" onSubmit={handleSubmit}>
          <p className="f3">Total: ₹{amt}</p>
          <PaymentElement />
          <button
            className={
              showPayBtn
                ? "bg-dark-blue w5 h2 white bn btn"
                : "bg-light-gray w5 h2 white bn btn flex justify-center items-center"
            }
            disabled={!showPayBtn}
          >
            {!showPayBtn ? (
              <TailSpin color="black" height={20} width={20} />
            ) : (
              "Pay"
            )}
          </button>
        </form>
      </div>
      {error && popupStatus && (
        <Modal>
          <ErrorPage showModal={closePopup} />
        </Modal>
      )}
    </article>
  );
}

export default CheckoutForm;
