import { useState, useEffect } from "react";
import TotalPayment from "./TotalPayment.jsx";

function ShowCartItems({ items, getCartItems, loginSuccess }) {
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let total = 0;
    items.map((item) => {
      total += Number(item.price) * item.cartCount;
    });
    setTotalPrice(total);
  }, [items]);

  async function increaseItemCount(item) {
    if (item.cartCount + 1 > item.count) return;
    let newItem = {
      id: item.id,
      name: item.name,
      cartCount: item.cartCount + 1,
      price: item.price,
      description: item.description,
      img: item.img,
      status: true,
      count: item.count,
      cat: item.cat,
      subcat: item.subcat,
      brand: item.brand,
      uid: item.uid,
    };
    if (loginSuccess) {
      fetch(`http://localhost:3000/Cart/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })
        .then(() => getCartItems())
        .catch((err) => console.log(err));
    } else {
      // //Changing UI element
      // let newList = [...items];
      // let itemIndex = newList.findIndex((el) => el.id === item.id);
      // newList[itemIndex] = newItem;
      // setCartList(newList);
      //Changing the count in local storage
      let cart = localStorage.getItem("cart");
      let cartItems = cart.split(",");
      let product = "";
      let index = 0;
      cartItems.forEach((el, i) => {
        if (el.includes(item.id)) {
          product = el;
          index = i;
        }
      });
      let productDetails = product.split("-");
      productDetails[3] = Number(productDetails[3]) + 1;
      productDetails = productDetails.join("-");
      cartItems[index] = productDetails;
      cart = cartItems.join(",");
      localStorage.setItem("cart", cart);
      getCartItems();
    }
  }

  async function decreaseItemCount(item) {
    if (item.cartCount == 1) return removeItem(item);
    let newItem = {
      id: item.id,
      name: item.name,
      cartCount: item.cartCount - 1,
      price: item.price,
      description: item.description,
      img: item.img,
      status: true,
      count: item.count,
      cat: item.cat,
      subcat: item.subcat,
      brand: item.brand,
      uid: item.uid,
    };
    if (loginSuccess) {
      fetch(`http://localhost:3000/Cart/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })
        .then(() => getCartItems())
        .catch((err) => console.log(err));
    } else {
      let cart = localStorage.getItem("cart");
      let cartItems = cart.split(",");
      let product = "";
      let index = 0;
      cartItems.forEach((el, i) => {
        if (el.includes(item.id)) {
          product = el;
          index = i;
        }
      });
      let productDetails = product.split("-");
      productDetails[3] = Number(productDetails[3]) - 1;
      productDetails = productDetails.join("-");
      cartItems[index] = productDetails;
      cart = cartItems.join(",");
      localStorage.setItem("cart", cart);
      getCartItems();
    }
  }

  async function removeItem(item) {
    if (loginSuccess) {
      await fetch(`http://localhost:3000/Cart/${item.id}`, {
        method: "DELETE",
      })
        .then(() => getCartItems())
        .catch((err) => console.log(err));
    } else {
      // let index = cartList.findIndex((el) => el.id === item.id);
      // let newCartList = cartList.splice(index, 1);
      // setCartList(newCartList);
      let cart = localStorage.getItem("cart");
      let cartItems = cart.split(",");
      if (cartItems.length === 1) {
        localStorage.removeItem("cart");
      } else {
        let productIndex = cartItems.findIndex((el) => el.includes(item.id));
        cartItems.splice(productIndex, 1);
        cart = cartItems.join(",");
        localStorage.setItem("cart", cart);
      }
      getCartItems();
    }
  }

  return (
    <div className="cart-container flex justify-center items-center w-100 h-100 mt4">
      <section className="shadow-2 w-70 flex justify-between">
        <section className="w-60 pa3">
          {items.map((item) => {
            return (
              <section key={item.id} className="w-80 h-40 flex">
                <img src={item.img} alt="product icon" className="w-20 h-100" />
                <section className="w-80 h-100">
                  <h4>{item.name}</h4>
                  <p>{item.description.slice(0, 100)}...</p>
                  <p>
                    <b>Price:</b> ₹{item.price}/-
                  </p>
                  {item.count == 1 ? (
                    <>
                      <p className="red">Only 1 item remaining</p>
                      <p className="red">Cannot add more than 1.</p>
                    </>
                  ) : (
                    ""
                  )}
                  <article>
                    Items:
                    <input
                      type="button"
                      value="+"
                      className="add bg-white b--light-silver br4 ma1"
                      onClick={() => increaseItemCount(item)}
                    />
                    <span className="ma3">{item.cartCount}</span>
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
        <TotalPayment
          totalPrice={totalPrice}
          count={items.length}
          loginStatus={loginSuccess}
        />
      </section>
    </div>
  );
}

export default ShowCartItems;
