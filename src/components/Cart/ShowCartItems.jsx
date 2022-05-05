import { useState, useEffect } from "react";
import TotalPayment from "./TotalPayment.jsx";

function ShowCartItems({ items, getCartItems }) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    items.map((item) => {
      total += item.price * item.count;
    });
    setTotalPrice(total);
  }, [items]);

  async function increaseItemCount(item) {
    let newItem = {
      id: item.id,
      name: item.name,
      count: item.count + 1,
      price: item.price,
      description: item.description,
      image: item.image,
      status: true,
    };
    await fetch(`http://localhost:3000/Cart/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then(() => getCartItems())
      .catch((err) => console.log(err));
  }

  async function decreaseItemCount(item) {
    if (item.count === 1) return removeItem(item);
    let newItem = {
      id: item.id,
      name: item.name,
      count: item.count - 1,
      price: item.price,
      description: item.description,
      image: item.image,
      status: true,
    };
    await fetch(`http://localhost:3000/Cart/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then(() => getCartItems())
      .catch((err) => console.log(err));
  }

  async function removeItem(item) {
    await fetch(`http://localhost:3000/Cart/${item.id}`, {
      method: "DELETE",
    })
      .then(() => getCartItems())
      .catch((err) => console.log(err));
  }
  return (
    <div className="cart-container flex justify-center items-center w-100 h-100 mt4">
      <section className="shadow-2 w-70 flex justify-between">
        <section className="w-60 pa3">
          {items.map((item) => {
            return (
              <section key={item.id} className="w-80 h-40 flex">
                <img
                  src={item.image}
                  alt="product icon"
                  className="w-20 h-100"
                />
                <section className="w-80 h-100">
                  <h4>{item.name}</h4>
                  <p>{item.description.slice(0, 100)}...</p>
                  <p>
                    <b>Price:</b> ₹{item.price}/-
                  </p>
                  <article>
                    Items:
                    <input
                      type="button"
                      value="+"
                      className="add bg-white b--light-silver br4 ma1"
                      onClick={() => increaseItemCount(item)}
                    />
                    <span className="ma3">{item.count}</span>
                    <input
                      type="button"
                      value="-"
                      className="remove bg-white b--light-silver br4 ma1"
                      onClick={() => decreaseItemCount(item)}
                    />
                  </article>
                </section>
              </section>
            );
          })}
        </section>
        <TotalPayment totalPrice={totalPrice} count={items.length} />
      </section>
    </div>
  );
}

export default ShowCartItems;
