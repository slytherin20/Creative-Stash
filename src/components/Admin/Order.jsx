function Order({ order }) {
  return (
    <section className="flex ml4">
      <img src={order.img} alt="product" className="h4 w4" />
      <section className="w-50">
        <p>{order.name}</p>
        <p>Total count: {order.cartCount}</p>
        <p>Price: ₹{Number(order.price) + 50}/-</p>
      </section>
      <section className="w-50">
        <p className="b">Shipping Details:</p>
        <p>{order.userName}</p>
        <p>{order.phoneNo}</p>
        <p>{order.address}</p>
      </section>
    </section>
  );
}

export default Order;
