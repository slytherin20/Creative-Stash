import { useEffect, useState } from "react";
import fetchOrderList from "../../data/fetchOrderList";
import Loading from "../Modals/Loading";
import OrderItem from "./OrderItem";
import { OrderDoc } from "../../interfaces/app_interface";
function OrderList() {
  const [orderList, setOrderList] = useState<OrderDoc | null>();
  const [loading, setLoading] = useState(true);
  useEffect(() => 
  {
    getOrders()
  }, []);

  async function getOrders() {
    let orders:OrderDoc = await fetchOrderList();
    setOrderList(orders);
    setLoading(false)
  }

  return (
    <div className="w-100 ma2">
      <h2>Orders</h2>
      {loading == true ? (
        <Loading />
      ) : !orderList?.orders ? (
        <div>
          <p>No orders placed yet</p>
        </div>
      ) : (
        <article className="w-90">
          {orderList && orderList.orders.map((item) => (
            <OrderItem
              key={item.id}
              item={item}
            />
          ))}
        </article>
      )}
    </div>
  );
}

export default OrderList;
