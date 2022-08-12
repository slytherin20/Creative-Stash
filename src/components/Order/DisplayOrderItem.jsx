import DeviceContext from "../DeviceContext.jsx";
import { useContext } from "react";
function DisplayOrderItem({ order }) {
  const { isMobile } = useContext(DeviceContext);
  let dateObj = new Date(order.orderDate);
  let date = dateObj.toLocaleString([], { hour12: true });
  return (
    <article className="w-100 pa3">
      <header className="order-border  flex   justify-between">
        <p className={`${isMobile ? "w-100" : "w-40 pa1"} `}>
          <b>Order Id:</b> CS-{order.id}
        </p>
        <p className={`${isMobile ? "w-100" : "w-40 pa1"} `}>
          <b>Order Date and Time:</b> {date}
        </p>
      </header>
      <section className={isMobile ? "flex flex-column" : "flex w-100"}>
        <section
          className={`${isMobile ? "w-100 pa1" : "w-40 pa3"}  shadow-1  `}
        >
          <p className="b">Shipping Address:</p>
          <p>{order.userName}</p>
          <p>{order.address}</p>
          <p>{order.phoneNo}</p>
        </section>
        <section
          className={`flex ${
            isMobile ? "flex-column w-100" : " flex-row w-50"
          }  ma2 items-center justify-between`}
        >
          <img src={order.img} alt="product" className="h4 w4 " />
          <section className={isMobile ? "w-100" : "w-60"}>
            <section>
              <p className="b">{order.name}</p>
              <p>
                <b>Items ordered:</b> {order.cartCount}
              </p>
            </section>
            <section>
              <p className="b">Payment Details:</p>
              <p className="w-100 flex">
                <span className="w-50">Total Product Amount:</span>
                <span className="w-50 ">
                  ₹ {Number(order.price) * Number(order.cartCount)}
                  /-
                </span>
              </p>
              <p className="w-100 flex">
                <span className="w-50">Delivery Charges:</span>
                <span className="w-50 ">₹50/-</span>
              </p>
              <p className="w-100 flex">
                <span className="w-50 pt2">Total Amount:</span>
                <span className="w-50  pt2">
                  {" "}
                  ₹{Number(order.price) * Number(order.cartCount) + 50}/-
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
