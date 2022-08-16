import { useState, useEffect, useContext } from "react";
import TotalPayment from "./TotalPayment.jsx";
import DeviceContext from "../DeviceContext.jsx";
function ShowCartItems({ items, getCartItems, loginSuccess }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const { isMobile } = useContext(DeviceContext);
  useEffect(() => {
    let total = 0;
    items.map((item) => {
      total += Number(item.price) * Number(item.cartCount);
    });
    setTotalPrice(total);
  }, [items]);

  async function increaseItemCount(item) {
    if (Number(item.cartCount) + 1 > item.count) return;
    let newItem = {
      id: item.id,
      name: item.name,
      cartCount: Number(item.cartCount) + 1,
      price: Number(item.price),
      description: item.description,
      img: item.img,
      status: true,
      count: Number(item.count),
      cat: item.cat,
      subcat: item.subcat,
      brand: item.brand,
      uid: item.uid,
    };
    if (loginSuccess) {
      fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Transfer-Encoding": "chunked",
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
      cartCount: Number(item.cartCount) - 1,
      price: Number(item.price),
      description: item.description,
      img: item.img,
      status: true,
      count: Number(item.count),
      cat: item.cat,
      subcat: item.subcat,
      brand: item.brand,
      uid: item.uid,
    };
    if (loginSuccess) {
      fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Transfer-Encoding": "chunked",
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
      await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart/${item.id}`, {
        method: "DELETE",
        headers: {
          "Transfer-Encoding": "chunked",
        },
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
    <div className="cart-container flex  justify-center items-center w-100 h-100 mt4 mb2">
      <section
        className={`shadow-2  flex justify-between ${
          isMobile ? "flex-column-reverse w-90" : "w-70"
        }`}
      >
        <section className={`${isMobile ? "w-100" : "w-60"} pa3`}>
          <h3>Cart Items</h3>
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
          isMobile={isMobile}
        />
      </section>
    </div>
  );
}

export default ShowCartItems;
