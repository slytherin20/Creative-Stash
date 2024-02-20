import { useState } from "react";
import { getAuth } from "firebase/auth";
import fetchBillingAddress from "../../data/fetchBillingAddress.jsx";
import { useNavigate } from "react-router-dom";
import Modal from "../Modals/Modal.jsx";
import ErrorPage from "../Modals/ErrorPage.jsx";
function BillingDetails() {
  const auth = getAuth();
  let billingDetails = {
    name: "",
    phoneNo: 0,
    deliveryAddress: "",
    city: "",
    state: "",
    pinCode: 0,
    id: "",
  };
  const [details, setDetails] = useState(billingDetails);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  function addFieldValue(e) {
    if (!(e.target instanceof HTMLInputElement)) return;
    let { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  }

  async function saveDetails(e) {
    e.preventDefault();
    setDetails({
      ...details,
      id: auth.currentUser.uid,
    });
    let addressExists = await fetchBillingAddress();
    if (addressExists) {
      modifyAddress();
    } else {
      addNewAddress({
        details,
        id: auth.currentUser.uid,
      });
    }
  }

  function modifyAddress() {
    fetch(`${process.env.REACT_APP_MOCKBACKEND}/Address`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Transfer-Encoding": "gzip",
      },
      body: JSON.stringify({
        details,
        tokenId: sessionStorage.getItem("tokenId"),
      }),
    })
      .then((res) => {
        if (res.ok) navigate(`/billing-details`);
        else Promise.reject();
      })
      .catch(() => setShowError(true));
  }

  function addNewAddress(addressObj) {
    fetch(`${process.env.REACT_APP_MOCKBACKEND}/Address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Transfer-Encoding": "gzip",
      },
      body: JSON.stringify({
        details: addressObj,
        tokenId: sessionStorage.getItem("tokenId"),
      }),
    })
      .then((res) => {
        if (res.ok) navigate(`/billing-details`);
        else Promise.reject();
      })
      .catch(() => setShowError(true));
  }

  return (
    <>
      <div className="flex w-100 justify-center items-center">
        <article className="w-60 flex flex-column justify-center items-center">
          <h3>Billing Details</h3>
          <form
            onChange={addFieldValue}
            onSubmit={saveDetails}
            className="flex flex-column justify-center items-center"
          >
            <label htmlFor="name" className="ma2">
              <span className="dib w4">Name:</span>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="pa2 ma1"
                required
              />
            </label>
            <label htmlFor="name" className="ma2">
              <span className="dib w4">Phone Number:</span>
              <input
                type="number"
                placeholder="Phone Number"
                name="phoneNo"
                className="pa2 ma1"
                required
              />
            </label>
            <p className="b">Delivery Address:</p>
            <label htmlFor="Address" className="ma2">
              <span className="dib w4">Address:</span>
              <input
                type="text"
                placeholder="Address"
                name="deliveryAddress"
                className="pa2 ma1"
                required
              />
            </label>
            <label htmlFor="City" className="ma2">
              <span className="dib w4">City:</span>
              <input
                type="text"
                placeholder="City"
                name="city"
                required
                className="pa2 ma1"
              />
            </label>
            <label htmlFor="State" className="ma2">
              <span className="dib w4">State:</span>
              <input
                type="text"
                placeholder="State"
                name="state"
                required
                className="pa2 ma1"
              />
            </label>
            <label htmlFor="pin-code" className="ma2">
              <span className="dib w4">Pincode:</span>
              <input
                type="number"
                placeholder="Pin Code"
                name="pinCode"
                className="pa2 ma1"
                required
              />
            </label>
            <button
              type="submit"
              className="ma2 login-btn bg-purple white bn pointer:hover btn"
            >
              Add Address
            </button>
          </form>
        </article>
      </div>
      {showError && (
        <Modal>
          <ErrorPage showModal={() => setShowError(false)} />
        </Modal>
      )}
    </>
  );
}

export default BillingDetails;
