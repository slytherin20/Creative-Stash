import { Link } from "react-router-dom";
import { BillingDetails } from "../../interfaces/app_interface";

function Address({ address }:{address:BillingDetails | null}) {
  return (
    <article className="w-100 flex flex-column justify-center items-center relative">
      {address && address.name && (
        <>
          <h3>Billing Details:</h3>
          <Link to={`/add-billing-address`}>
            <button className="bn w3 h2 bg-purple white btn absolute right-2">
              Edit
            </button>
          </Link>
          <section className="w-100 flex flex-column justify-center items-center mt4">
            <p className="w-50 flex ma2">
              <span className="b dib w-50">Name:</span>
              <span className="dib w-50">{address.name}</span>
            </p>
            <p className="w-50 flex ma2">
              <span className="b dib w-50">Phone Number:</span>
              <span className="dib w-50">{address.phoneNo}</span>
            </p>
            <p className="w-50 flex ma2">
              <span className="b dib w-50">Address:</span>
              <span className="dib w-50">{address.deliveryAddress}</span>
            </p>
            <p className="w-50 flex ma2">
              <span className="b dib w-50">City:</span>
              <span className="dib w-50">{address.city}</span>
            </p>
            <p className="w-50 flex ma2">
              <span className="b dib w-50">State:</span>
              <span className="dib w-50">{address.state}</span>
            </p>
            <p className="w-50 flex ma2">
              <span className="b dib w-50">Pin code:</span>
              <span className="dib w-50">{address.pinCode}</span>
            </p>
          </section>
        </>
      )}
      {!address && (
        <section>
          <p>No saved address.</p>
          <Link to={`/add-billing-address`}>
            <button className="login-btn bg-purple white pointer:hover">
              Add Adress Now
            </button>
          </Link>
        </section>
      )}
    </article>
  );
}

export default Address;
