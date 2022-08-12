import { useEffect, useState } from "react";
import Loading from "../Modals/Loading.jsx";
import Order from "./Order.jsx";
function ShowOrdersReceived() {
  const [orders, setOrders] = useState([]);
  useEffect(() => fetchOrdersReceived(), []);

  async function fetchOrdersReceived() {
    let res = await fetch("http://localhost:3000/orders");
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
        {orders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </section>
    );
}

export default ShowOrdersReceived;
