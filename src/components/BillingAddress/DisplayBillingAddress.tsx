import { useContext, useEffect, useState } from "react";
import fetchBillingAddress from "../../data/fetchBillingAddress";

import Loading from "../Modals/Loading";
import NotFound from "../NotFound";
import Address from "./Address";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { BillingDetails } from "../../interfaces/app_interface";

function DisplayBillingAddress({ width }:{width:number}) {
  const [address, setAddress] = useState<BillingDetails | null>(null);
  const navigate = useNavigate();
  const uid = useContext(AuthContext);
  useEffect(() => {
    getAddress();
  }, [uid]);

  async function getAddress() {
    if (!uid) return;
    let data:BillingDetails | null = await fetchBillingAddress();
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
