function Order({ order }) {
  return (
    <section className="flex">
      <img src={order.img} alt="product" className="h5 w5" />
      <section>
        <p>{order.name}</p>
        <p>Total count: {order.cartCount}</p>
        <p>Price: ₹{Number(order.price) + 50}/-</p>
      </section>
      <section>
        <p>Shipping Details:</p>
        <p>{order.userName}</p>
        <p>{order.phoneNo}</p>
        <p>{order.address}</p>
      </section>
    </section>
  );
}

export default Order;
