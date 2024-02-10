import { useState, useEffect, useContext } from "react";
import TotalPayment from "./TotalPayment.jsx";
import DeviceContext from "../DeviceContext.jsx";
import Modal from "../Modals/Modal.jsx";
import { TailSpin } from "react-loader-spinner";
function ShowCartItems({ items, getCartItems, loginSuccess }) {
  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    let newItem = {
      id: item.id,
      name: item.name,
      cartCount: Number(item.cartCount) + 1,
      price: Number(item.price),
      description: item.description,
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
          "Transfer-Encoding": "gzip",
        },
        body: JSON.stringify(newItem),
      })
        .then(() => {
          getCartItems();
          setLoading(false);
        })
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
      let productDetails = product.split("|");
      productDetails[3] = Number(productDetails[3]) + 1;
      productDetails = productDetails.join("|");
      cartItems[index] = productDetails;
      cart = cartItems.join(",");
      localStorage.setItem("cart", cart);
      getCartItems();
      setLoading(false);
    }
  }

  async function decreaseItemCount(item) {
    if (item.cartCount == 1) return removeItem(item);
    setLoading(true);
    let newItem = {
      id: item.id,
      name: item.name,
      cartCount: Number(item.cartCount) - 1,
      price: Number(item.price),
      description: item.description,
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
          "Transfer-Encoding": "gzip",
        },
        body: JSON.stringify(newItem),
      })
        .then(() => {
          getCartItems();
          setLoading(false);
        })
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
      let productDetails = product.split("|");
      productDetails[3] = Number(productDetails[3]) - 1;
      productDetails = productDetails.join("|");
      cartItems[index] = productDetails;
      cart = cartItems.join(",");
      localStorage.setItem("cart", cart);
      getCartItems();
      setLoading(false);
    }
  }

  async function removeItem(item) {
    setLoading(true);
    if (loginSuccess) {
      await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart/${item.id}`, {
        method: "DELETE",
        headers: {
          "Transfer-Encoding": "gzip",
        },
      })
        .then(() => {
          getCartItems();
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
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
      setLoading(false);
    }
  }

  return (
    <>
      <div className="cart-container flex  justify-center items-center w-100 h-100 mt4 mb2">
        <section
          className={`shadow-2  flex justify-between ${
            isMobile ? "flex-column-reverse w-90" : "w-70"
          }`}
        >
          <section className={`${isMobile ? "w-100" : "w-60"} pa3`}>
            <h3>Cart Items</h3>
            {items.length > 0 &&
              items.map((item) => {
                return (
                  <section
                    key={item.id}
                    className="w-80 h-40 flex items-center"
                  >
                    <img
                      src={process.env.REACT_IMG_URL + item.cloudinaryId}
                      alt="product icon"
                      className="w-20 h-100"
                    />

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
      {loading ? (
        <Modal>
          <div className="pa3 bg-white flex flex-column justify-center items-center">
            <TailSpin width={20} height={20} />
            <p>Updating Cart...</p>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default ShowCartItems;
