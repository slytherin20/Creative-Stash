import { useEffect, useState } from "react";
import fetchOrderList from "../../data/fetchOrderList.jsx";
import Loading from "../Modals/Loading.jsx";
import OrderItem from "./OrderItem.jsx";
function OrderList({ uid, setOrderDetailsHandler }) {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => getOrders(), []);

  async function getOrders() {
    let orders = await fetchOrderList(uid);
    setOrderList(orders);
  }

  return (
    <div className="w-100 ma2">
      <h2>Orders</h2>
      {orderList.length === 0 ? (
        <Loading />
      ) : (
        <article className="w-90">
          {orderList.map((item) => (
            <OrderItem
              key={item.id}
              item={item}
              setOrderDetailsHandler={setOrderDetailsHandler}
            />
          ))}
        </article>
      )}
    </div>
  );
}

export default OrderList;
