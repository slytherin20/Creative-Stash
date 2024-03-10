import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchOrderItem from "../../data/fetchOrderItem";
import Loading from "../Modals/Loading";
import NotFound from "../NotFound";
import DisplayOrderItem from "./DisplayOrderItem";
import { AuthContext } from "../App";
import { OrderItem } from "../../interfaces/app_interface";
function OrderItemDetails() {
  const [order, setOrder] = useState<OrderItem | null>();
  const params = useParams();
  const user = useContext(AuthContext);
  useEffect(() => {
    if (user) fetchOrder();
  }, [user]);

  async function fetchOrder() {
    let orderItem = await fetchOrderItem(Number(params.id));

    if (!orderItem) setOrder(null);
    setOrder(orderItem);
  }

  if (user === undefined) return <Loading />;
  else if (user === null) return <NotFound />;
  else if (user) {
    if (!order) return <NotFound />;
    else if (order.name) return <DisplayOrderItem order={order} />; 
    else return <Loading />;
  }
}

export default OrderItemDetails;
