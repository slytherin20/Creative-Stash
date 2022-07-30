import { Link } from "react-router-dom";
function OrderItem({ item }) {
  return (
    <div className="flex flex-column w-80">
      <section className="flex justify-between">
        <p>Order ID: CS-{item.id}</p>
        <Link to={`/order-details/${item.id}`}>
          <button>Order Details</button>
        </Link>
      </section>
      <section className="flex">
        <img src={item.img} alt={item.name} className="w4 h4" />
        <section>
          <p>{item.name}</p>
          <p>₹{item.price * item.cartCount + 50}/-</p>
          <p>{item.cartCount}</p>
        </section>
      </section>
    </div>
  );
}

export default OrderItem;
