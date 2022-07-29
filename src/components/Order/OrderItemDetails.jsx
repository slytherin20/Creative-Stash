import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchOrderItem from "../../data/fetchOrderItem.js";
import Loading from "../Modals/Loading.jsx";
import NotFound from "../NotFound.jsx";
import DisplayOrderItem from "./DisplayOrderItem.jsx";

function OrderItemDetails() {
  const [user, setUser] = useState(undefined);
  const [order, setOrder] = useState({});
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    if (user) fetchOrder();
  }, [user]);

  async function fetchOrder() {
    let orderItem = await fetchOrderItem(params.id);

    if (orderItem.uid === user) setOrder(orderItem);
    else if (!orderItem) setOrder(null);
  }
  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user.uid);
    else setUser(null);
  });
  if (user === undefined) return <Loading />;
  else if (user === null) return <NotFound />;
  else if (user) {
    if (order.name) return <DisplayOrderItem order={order} />;
    else if (!order) return <NotFound />;
    else return <Loading />;
  }
}

export default OrderItemDetails;
