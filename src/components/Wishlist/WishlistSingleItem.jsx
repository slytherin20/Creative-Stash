import { Link } from "react-router-dom";
import HeartIcon from "../../images/hearted.png";
import DeviceContext from "../DeviceContext.jsx";
import { useContext, useEffect, useState } from "react";
import fetchProductImg from "../../data/fetchProductImg.js";
import { TailSpin } from "react-loader-spinner";
function WishlistSingleItem({
  item,
  uid,
  removeItemFromWishlist,
  fetchCartHandler,
}) {
  const [img, setImg] = useState(undefined);
  const { isMobile } = useContext(DeviceContext);

  useEffect(() => fetchImage(), []);

  async function fetchImage() {
    let res = await fetchProductImg(item.productId);
    setImg(res);
  }
  async function addToCart() {
    await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Transfer-Encoding": "gzip",
      },
      body: JSON.stringify({
        ...item,
        uid: uid,
        cartCount: 1,
      }),
    })
      .then(() => fetchCartHandler())
      .catch((err) => console.log(err));
  }
  return (
    <div
      className={`flex flex-column justify-center ${
        isMobile ? "w-90" : "w-30"
      } items-center pa2`}
    >
      <Link
        to={`/products/product?cat=${item.cat}&subcat=${item.subcat}&id=${item.productId}`}
        className="flex flex-column justify-content items-center"
      >
        {img != undefined ? (
          <img src={img} alt={item.name} className="item-icons" />
        ) : (
          <div className="w-20 h-100 bg-white flex justify-center items-center">
            <TailSpin width={20} height={20} color="purple" />
          </div>
        )}

        <p className="ma0 mt2">{item.name.slice(0, 30)}...</p>
        <p className="ma0 mt2 f6">{item.description.slice(0, 40)}...</p>
        <p>Price: ₹{item.price}</p>
      </Link>
      {item.status ? "" : <p className="red">Out of Stock</p>}
      <div className="flex justify-center items-center f6">
        <button
          onClick={() => removeItemFromWishlist(item.id)}
          className="bg-white bn flex items-center"
        >
          <img src={HeartIcon} alt="wishlisted" className="wishlist" />
          Wishlisted
        </button>
        {item.status ? (
          <button
            className="btn h2 w4 bg-purple white f6 br1 ma1"
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default WishlistSingleItem;
