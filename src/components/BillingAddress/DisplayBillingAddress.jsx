import { useEffect, useState } from "react";
import fetchBillingAddress from "../../data/fetchBillingAddress.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "../Modals/Loading.jsx";
import NotFound from "../NotFound.jsx";
import Address from "./Address.jsx";
function DisplayBillingAddress() {
  const [address, setAddress] = useState({});
  const [uid, setUid] = useState(undefined);
  const auth = getAuth();
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
    }
  }

  return uid === undefined ? (
    <div className="w-100 vh-100 flex justify-center items-center">
      <Loading />
    </div>
  ) : uid === null ? (
    <NotFound />
  ) : (
    <Address address={address} />
  );
}

export default DisplayBillingAddress;
