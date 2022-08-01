import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import addToWishlist from "../../data/addToWishlist.js";
import checkItemWishlisted from "../../data/checkItemWishlisted.js";
import removeFromWishlist from "../../data/removeFromWishlist.js";
function SingleProduct({ fetchCartHandler }) {
  const [product, setProduct] = useState({});
  const [wishlist, setWishlist] = useState({ status: false, id: -1 });
  const [searchParams] = useSearchParams();
  let cat = searchParams.get("cat").split(" ").join("_");
  let subcat = searchParams.get("subcat").split(" ").join("_");
  let itemId = searchParams.get("id");
  const auth = getAuth();
  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    let res = await fetch(
      `http://localhost:3000/${cat}-${subcat}?id=${itemId}`
    );
    let data = await res.json();
    setProduct(...data);
    if (auth.currentUser) wishlistStatus(data[0].id);
  }

  async function wishlistStatus(id) {
    let [status, wishlistId] = await checkItemWishlisted(
      auth.currentUser.uid,
      id
    );
    setWishlist({
      status: status,
      id: wishlistId,
    });
  }

  function removeWishlisted(id) {
    removeFromWishlist(id);
    setWishlist({
      status: false,
      id: -1,
    });
  }

  async function addWishlisted(item, uid) {
    await addToWishlist(item, uid);
    wishlistStatus(item.id);
  }

  async function addToCart() {
    if (auth.currentUser) {
      //Save to user cart
      await fetch(`http://localhost:3000/Cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...product,
          uid: auth.currentUser.uid,
          cartCount: 1,
        }),
      })
        .then(() => fetchCartHandler())
        .catch((err) => console.log(err));
    } else {
      //For anonymyous users
      let cart = localStorage.getItem("cart");
      if (cart) {
        cart = [cart, `${cat}-${subcat}-${itemId}`];
        localStorage.setItem("cart", cart);
      } else {
        localStorage.setItem("cart", [`${cat}-${subcat}-${itemId}`]);
      }
      fetchCartHandler();
    }
  }
  return (
    <main className="single-product flex ma4">
      <aside className="w-50">
        <img src={product.img} alt={product.name} className="w-80 h-80" />
      </aside>
      <section className="w-50 flex flex-column">
        <h2>{product.name}</h2>
        <h2>
          Price: <span className="price-color">₹{product.price}/-</span>
        </h2>
        <p className="f4 pa2">{product.description}</p>
        <article className="w-60 flex justify-between self-center">
          {wishlist.status
            ? auth.currentUser && (
                <button onClick={() => removeWishlisted(wishlist.id)}>
                  Hearted
                </button>
              )
            : auth.currentUser && (
                <button
                  onClick={() => addWishlisted(product, auth.currentUser.uid)}
                >
                  Heart
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
  );
}
export default SingleProduct;
