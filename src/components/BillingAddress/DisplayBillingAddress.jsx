import { useEffect, useState } from "react";
import fetchBillingAddress from "../../data/fetchBillingAddress.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "../Modals/Loading.jsx";
import NotFound from "../NotFound.jsx";
import Address from "./Address.jsx";
import { useNavigate } from "react-router-dom";
function DisplayBillingAddress({ width }) {
  const [address, setAddress] = useState({});
  const [uid, setUid] = useState(undefined);
  const auth = getAuth();
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user) setUid(user.uid);
    else setUid(null);
  });
  useEffect(() => {
    getAddress();
  }, [uid]);

  async function getAddress() {
    if (!uid) return;
    let data = await fetchBillingAddress(uid);
    if (data.length > 0) {
      setAddress(...data);
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
