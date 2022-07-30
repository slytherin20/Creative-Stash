function DisplayOrderItem({ order }) {
  let dateObj = new Date(order.orderDate);
  let date = dateObj.toLocaleString([], { hour12: true });
  return (
    <article>
      <header className="bg-light-gray h3 flex justify-between">
        <p>Order Id: CS-{order.id}</p>
        <p>Order Date and Time: {date}</p>
      </header>
      <section className="flex">
        <section className="w-40 ma2">
          <p>Shipping Address:</p>
          <p>{order.userName}</p>
          <p>{order.address}</p>
          <p>{order.phoneNo}</p>
        </section>
        <section className="flex w-50 ma2">
          <img src={order.img} alt="product" className="h5 w5" />
          <section>
            <section>
              <p>{order.name}</p>
              <p>Items ordered: {order.cartCount}</p>
            </section>
            <section>
              <p>Payment Details:</p>
              <p>Total Product Amount: ₹{order.price * order.cartCount}/-</p>
              <p>Delivery Charges: ₹50/-</p>
              <p>
                Total Amount:{" "}
                <span className="bt">
                  {" "}
                  ₹{order.price * order.cartCount + 50}/-
                </span>
              </p>
            </section>
          </section>
        </section>
      </section>
    </article>
  );
}

export default DisplayOrderItem;
