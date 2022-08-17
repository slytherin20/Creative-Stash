import { useEffect, useState } from "react";
import addImgToItem from "../../data/addImgToItem.js";
import fetchAllProductImgs from "../../data/fetchAllProductImgs.js";
import Loading from "../Modals/Loading.jsx";
import Order from "./Order.jsx";
function ShowOrdersReceived() {
  const [orders, setOrders] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => fetchOrdersReceived(), []);

  async function fetchOrdersReceived() {
    let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/orders`, {
      headers: {
        "Transfer-Encoding": "gzip",
      },
    });
    if (!res.ok) setOrders(null);
    let ordersReceived = await res.json();
    setOrders(ordersReceived);
    if (images.length === 0) fetchItemImgs(ordersReceived);
  }

  async function fetchItemImgs(ordersReceived) {
    if (ordersReceived.length === 0) return;
    let imgs = await fetchAllProductImgs(ordersReceived);
    setImages(imgs);

    let mergedOrders = await addImgToItem(imgs, ordersReceived);
    setOrders(mergedOrders);
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
