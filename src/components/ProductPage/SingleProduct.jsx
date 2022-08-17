import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import addToWishlist from "../../data/addToWishlist.js";
import checkItemWishlisted from "../../data/checkItemWishlisted.js";
import removeFromWishlist from "../../data/removeFromWishlist.js";
import HeartIcon from "../../images/heart.png";
import HeartedIcon from "../../images/hearted.png";
import DeviceContext from "../DeviceContext.jsx";
import Loading from "../Modals/Loading.jsx";
import Modal from "../Modals/Modal.jsx";
import { TailSpin } from "react-loader-spinner";
function SingleProduct({ fetchCartHandler }) {
  const [product, setProduct] = useState({});
  const [wishlist, setWishlist] = useState({ status: false, id: -1 });
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState({ status: false, text: "" });
  const { isMobile } = useContext(DeviceContext);
  const [searchParams] = useSearchParams();
  let cat = searchParams.get("cat").split(" ").join("_");
  let subcat = searchParams.get("subcat").split(" ").join("_");
  let itemId = searchParams.get("id");
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user.uid);
    else setUser(null);
  });
  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    let res = await fetch(
      `${process.env.REACT_APP_MOCKBACKEND}/${cat}-${subcat}?id=${itemId}`,
      {
        headers: {
          "Transfer-Encoding": "gzip",
        },
      }
    );
    let data = await res.json();
    setProduct(...data);
    if (user) wishlistStatus(data[0].id);
  }

  async function wishlistStatus(id) {
    let [status, wishlistId] = await checkItemWishlisted(user, id);
    setWishlist({
      status: status,
      id: wishlistId,
    });
  }

  function removeWishlisted(id) {
    setLoading({ status: true, text: "Adding to wishlist..." });
    removeFromWishlist(id);
    setWishlist({
      status: false,
      id: -1,
    });
    setLoading({ status: false, text: "" });
  }

  async function addWishlisted(item, uid) {
    setLoading({ status: true, text: "Adding to wishlist..." });
    await addToWishlist(item, uid);
    wishlistStatus(item.id);
    setLoading({ status: false, text: "" });
  }

  async function addToCart() {
    if (user) {
      //Save to user cart
      await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Transfer-Encoding": "gzip",
        },
        body: JSON.stringify({
          ...product,
          uid: user,
          cartCount: 1,
          count: Number(product.count),
        }),
      })
        .then(() => fetchCartHandler())
        .catch((err) => console.log(err));
    } else {
      //For anonymyous users
      let cart = localStorage.getItem("cart");
      if (cart) {
        cart = [cart, `${cat}-${subcat}-${itemId}-1`];
        localStorage.setItem("cart", cart);
      } else {
        localStorage.setItem("cart", [`${cat}-${subcat}-${itemId}-1`]);
      }
      fetchCartHandler();
    }
  }
  return product.name ? (
    <>
      <main className={isMobile ? "flex flex-column pa1" : "flex ma4"}>
        <aside className={isMobile ? "w-100" : "w-50"}>
          <img src={product.img} alt={product.name} className="w-80 h-80" />
        </aside>
        <section className={`${isMobile ? "w-100" : "w-50"} flex flex-column`}>
          <h2>{product.name}</h2>
          <h2>
            Price: <span className="price-color">₹{product.price}/-</span>
          </h2>
          <p className="f4 pa2">{product.description}</p>
          <article className="w-60 flex justify-between self-center">
            {wishlist.status
              ? user && (
                  <button
                    onClick={() => removeWishlisted(wishlist.id)}
                    className="bn bg-white"
                  >
                    <img
                      src={HeartedIcon}
                      alt="wishlisted"
                      className="wishlist"
                    />
                  </button>
                )
              : user && (
                  <button
                    onClick={() => addWishlisted(product, user)}
                    className="bn bg-white"
                  >
                    <img
                      src={HeartIcon}
                      alt="wishlisted"
                      className="wishlist"
                    />
                  </button>
                )}
            {product.status ? (
              <input
                type="button"
                value="Add to Cart"
                className="login-btn bg-yellow btn"
                onClick={addToCart}
              />
            ) : (
              <p className="red">Out of Stock</p>
            )}
          </article>
        </section>
      </main>
      {loading.status ? (
        <Modal>
          <div className="pa3 bg-white flex flex-column justify-center items-center">
            <TailSpin width={20} height={20} color="purple" />
            <p>{loading.text}</p>
          </div>
        </Modal>
      ) : null}
    </>
  ) : (
    <Loading />
  );
}
export default SingleProduct;
