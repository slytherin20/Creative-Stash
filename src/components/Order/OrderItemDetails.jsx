import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchOrderItem from "../../data/fetchOrderItem.js";
import Loading from "../Modals/Loading.jsx";
import NotFound from "../NotFound.jsx";
import DisplayOrderItem from "./DisplayOrderItem.jsx";
import { AuthContext } from "../App.jsx";
function OrderItemDetails() {
  const [order, setOrder] = useState({});
  const params = useParams();
  const user = useContext(AuthContext);
  useEffect(() => {
    if (user) fetchOrder();
  }, [user]);

  async function fetchOrder() {
    let orderItem = await fetchOrderItem(params.id);

    if (!orderItem) setOrder(null);
    setOrder(orderItem);
  }

  if (user === undefined) return <Loading />;
  else if (user === null) return <NotFound />;
  else if (user) {
    if (order.name) return <DisplayOrderItem order={order} />;
    else if (!order) return <NotFound />;
    else return <Loading />;
  }
}

export default OrderItemDetails;
