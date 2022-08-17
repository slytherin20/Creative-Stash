import { Link } from "react-router-dom";
import fetchProductImg from "../../data/fetchProductImg.js";
import { TailSpin } from "react-loader-spinner";
import { useState, useEffect } from "react";
import DeviceContext from "../DeviceContext.jsx";
import { useContext } from "react";
function OrderItem({ item }) {
  const [img, setImg] = useState(undefined);
  const { isMobile } = useContext(DeviceContext);

  useEffect(() => fetchOrderImage(), []);

  async function fetchOrderImage() {
    let res = await fetchProductImg(item.productId);
    setImg(res);
  }

  return isMobile ? (
    <Link to={`/order-details/${item.id}`}>
      <div className="flex flex-column w-100 pa2 order-border">
        <section className="flex justify-between">
          <p>
            <b>Order ID:</b> CS-{item.id}
          </p>
        </section>
        <section className="flex">
          {img != undefined ? (
            <img src={img} alt={item.name} className="w4 h4" />
          ) : (
            <div className="w-20 h-100 bg-white flex justify-center items-center">
              <TailSpin width={20} height={20} color="purple" />
            </div>
          )}

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
        {img != undefined ? (
          <img src={img} alt={item.name} className="w4 h4" />
        ) : (
          <div className="w-20 h-100 bg-white flex justify-center items-center">
            <TailSpin width={20} height={20} color="purple" />
          </div>
        )}
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
