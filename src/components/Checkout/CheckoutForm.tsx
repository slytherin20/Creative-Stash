import DisplayBillingAddress from "../BillingAddress/DisplayBillingAddress";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { TailSpin } from "react-loader-spinner";
import { useState, useContext, useEffect, FormEvent } from "react";
import CartContext from "../Cart/CartContext";
import ErrorPage from "../Modals/ErrorPage";
import Modal from "../Modals/Modal";
import DeviceContext from "../DeviceContext";
function CheckoutForm() {
  const [amt, setAmt] = useState(0);
  const [error, setErrorMessage] = useState('');
  const [popupStatus, setPopupStatus] = useState(false);
  const [showPayBtn, setShowPayBtn] = useState(false);
  const { isMobile } = useContext(DeviceContext);
  const elements = useElements();
  const stripe = useStripe();

  const cartItems = useContext(CartContext);

  useEffect(() => sendCartItemsToServer(), [cartItems]);

  function sendCartItemsToServer() {
    let res = cartItems.reduce((acc, obj) => {
      let addition = acc + Number(obj.price) * Number(obj.cartCount);
      return addition;
    }, 50);
    setAmt(res);
    let paymentIntentId = localStorage.getItem("pid");
    fetch(`${process.env.REACT_APP_URI}/cart-checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Transfer-Encoding": "gzip",
      },
      body: JSON.stringify({ amount: res, paymentIntentId: paymentIntentId }),
    })
      .then((res) => {
        if (!res.ok) Promise.reject();
        else setShowPayBtn(true);
      })
      .catch((err) => console.log(err));
  }
  async function handleSubmit(e:FormEvent) {
    e.preventDefault();

    if (!elements || !stripe) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.REACT_APP_URI}/payment-status`,
      },
    });
 
    if (error) {
      setErrorMessage(error.message || '');
      setPopupStatus(true);
    } else {
      setErrorMessage('');
      setPopupStatus(false);
    }
  }

  function closePopup() {
    setPopupStatus(false);
  }
  return (
    <article className={isMobile ? "flex flex-column w-100" : "flex w-100"}>
      <DisplayBillingAddress width={50} />
      <div className="mt3">
        {error && <p className="red tc">{error}</p> }
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
