import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import Loading from "../Modals/Loading.jsx";
import NotFound from "../NotFound.jsx";
import OrderList from "./OrderList.jsx";
function ShowOrders() {
  const [user, setUser] = useState(undefined);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user.uid);
    else setUser(null);
  });

  return user === undefined ? (
    <Loading />
  ) : user === null ? (
    <NotFound />
  ) : (
    <OrderList uid={user} />
  );
}

export default ShowOrders;
