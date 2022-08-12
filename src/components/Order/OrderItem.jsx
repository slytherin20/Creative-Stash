import { Link } from "react-router-dom";
import DeviceContext from "../DeviceContext.jsx";
import { useContext } from "react";
function OrderItem({ item }) {
  const { isMobile } = useContext(DeviceContext);
  return isMobile ? (
    <Link to={`/order-details/${item.id}`}>
      <div className="flex flex-column w-100 pa2 order-border">
        <section className="flex justify-between">
          <p>
            <b>Order ID:</b> CS-{item.id}
          </p>
        </section>
        <section className="flex">
          <img src={item.img} alt={item.name} className="w4 h4" />
          <section>
            <p>{item.name}</p>
            <p>₹{Number(item.price) * Number(item.cartCount) + 50}/-</p>
            <p>{item.cartCount}</p>
          </section>
        </section>
      </div>
    </Link>
  ) : (
    <div className="flex flex-column w-100 pa2">
      <section className="flex justify-between">
        <p>
          <b>Order ID:</b> CS-{item.id}
        </p>
        <Link to={`/order-details/${item.id}`}>
          <button className="border-purple btn h2 pa1 bg-white f6">
            Order Details
          </button>
        </Link>
      </section>
      <section className="flex">
        <img src={item.img} alt={item.name} className="w4 h4" />
        <section>
          <p>{item.name}</p>
          <p>₹{Number(item.price) * Number(item.cartCount) + 50}/-</p>
          <p>{item.cartCount}</p>
        </section>
      </section>
    </div>
  );
}

export default OrderItem;
