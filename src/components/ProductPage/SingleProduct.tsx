import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import addToWishlist from "../../data/addToWishlist";
import checkItemWishlisted from "../../data/checkItemWishlisted";
import removeFromWishlist from "../../data/removeFromWishlist";
import HeartIcon from "../../images/heart.png";
import HeartedIcon from "../../images/hearted.png";
import DeviceContext from "../DeviceContext";
import Loading from "../Modals/Loading";
import Modal from "../Modals/Modal";
import { TailSpin } from "react-loader-spinner";
// import fetchProductImg from "../../data/fetchProductImg.js";
import checkCartItemExists from "../../data/checkCartItemExists";
import { AuthContext } from "../App";
import { Product, WishlistItem } from "../../interfaces/app_interface";
function SingleProduct({ fetchCartHandler }:{
  fetchCartHandler:()=>Promise<void>
}) {
  const [product, setProduct] = useState<Product>();
  const [wishlist, setWishlist] = useState({ status: false, id: '' });
  const [loading, setLoading] = useState({ status: false, text: "" });
  const { isMobile } = useContext(DeviceContext);
  const [searchParams] = useSearchParams();
  const user = useContext(AuthContext);
  let cat = searchParams.get("cat")?.split(" ").join("-");
  let subcat = searchParams.get("subcat")?.split(" ").join("-");
  let itemId = searchParams.get("id");

  useEffect(() => {
    getProduct();
  }, [user]);

  async function getProduct() {
    let res = await fetch(
      `${process.env.REACT_APP_MOCKBACKEND}/${cat}/${itemId}`,
      {
        headers: {
          "Transfer-Encoding": "gzip",
        },
      }
    );
    let data:Product = await res.json();
    setProduct(data);
    if (user) wishlistStatus(data.id);
  }

  async function wishlistStatus(id:number) {
    let [status, wishlistId] = await checkItemWishlisted(id);
    setWishlist({
      status: status,
      id: wishlistId,
    });
  }

  function removeWishlisted(id:string) {
    setLoading({ status: true, text: "Removing from wishlist..." });
    removeFromWishlist(id);
    setWishlist({
      status: false,
      id: '',
    });
    setLoading({ status: false, text: "" });
  }

  async function addWishlisted(item:Product, uid:string) {
    setLoading({ status: true, text: "Adding to wishlist..." });
    await addToWishlist(item, uid);
    wishlistStatus(item.id);
    setLoading({ status: false, text: "" });
  }

  async function addToCart() {
    if (user && product) {
      let itemExists = await checkCartItemExists<Product>(product);
      if (itemExists && itemExists.length > 0) {
        await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart/${product.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartCount: itemExists[0].cartCount + 1,
            tokenId: sessionStorage.getItem("tokenId"),
          }),
        })
          .then(() => fetchCartHandler())
          .catch((err) => console.log(err));
      } else {
        await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Transfer-Encoding": "gzip",
          },
          body: JSON.stringify({
            item: {
              ...product,
              cartCount: 1,
            },
            tokenId: sessionStorage.getItem("tokenId"),
          }),
        })
          .then(() => fetchCartHandler())
          .catch((err) => console.log(err));
      }
    } else {
      //For anonymyous users
      let cart:string = localStorage.getItem("cart") || ''
      if (cart) {
        cart = String([cart, `${cat}|${subcat}|${itemId}|1`]);
        localStorage.setItem("cart", cart);
      } else {
        localStorage.setItem("cart", String([`${cat}|${subcat}|${itemId}|1`]));
      }
      fetchCartHandler();
    }
  }
  return product?.name ? (
    <>
      <main className={isMobile ? "flex flex-column pa1" : "flex ma4"}>
        <aside className={isMobile ? "w-100" : "w-50"}>
          <img
            src={process.env.REACT_IMG_URL + product.cloudinaryId}
            alt={product.name}
            className="w-80 h-80"
          />
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
