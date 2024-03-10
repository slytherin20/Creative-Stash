import { useEffect, useState } from "react";
import Loading from "../Modals/Loading";
import Order from "./Order";
import { OrderDoc } from "../../interfaces/app_interface";
function ShowOrdersReceived() {
  const [orders, setOrders] = useState<OrderDoc | null>(null);
  useEffect(() => {
    fetchOrdersReceived()
  }, []);

  async function fetchOrdersReceived() {
    let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Orders`, {
      headers: {
        "Transfer-Encoding": "gzip",
        Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
      },
    });
    if (!res.ok) setOrders(null);
    let ordersReceived = await res.json();
    setOrders(ordersReceived);
  }

  if (orders === null) return <section>No orders placed.</section>;
  else if (!orders) return <Loading />;
  else
    return (
      <section className="w-80 ma2 flex flex-column">
        <h2>Orders Received</h2>
        {orders.orders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </section>
    );
}

export default ShowOrdersReceived;
