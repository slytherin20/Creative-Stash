import { useContext, useEffect, useState } from "react";
import fetchBillingAddress from "../../data/fetchBillingAddress.jsx";

import Loading from "../Modals/Loading.jsx";
import NotFound from "../NotFound.jsx";
import Address from "./Address.jsx";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App.jsx";
function DisplayBillingAddress({ width }) {
  const [address, setAddress] = useState({});
  const navigate = useNavigate();
  const uid = useContext(AuthContext);
  useEffect(() => {
    getAddress();
  }, [uid]);

  async function getAddress() {
    if (!uid) return;
    let data = await fetchBillingAddress(uid);
    if (data) {
      setAddress(data);
    } else {
      navigate("/add-billing-address");
    }
  }

  return uid === undefined ? (
    <div className={`w-${width} vh-100 flex justify-center items-center`}>
      <Loading />
    </div>
  ) : uid === null ? (
    <NotFound />
  ) : (
    <Address address={address} />
  );
}

export default DisplayBillingAddress;
