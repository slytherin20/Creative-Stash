import { TailSpin } from "react-loader-spinner";
function Order({ order }) {
  return (
    <section className="flex ml4">
      {order.img != undefined ? (
        <img src={order.img} alt="product" className="h4 w4" />
      ) : (
        <div className="w-20 h-100 bg-white flex justify-center items-center">
          <TailSpin width={20} height={20} color="purple" />
        </div>
      )}

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
