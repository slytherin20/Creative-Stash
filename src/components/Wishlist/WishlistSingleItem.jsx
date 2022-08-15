import { Link } from "react-router-dom";
import HeartIcon from "../../images/hearted.png";
import DeviceContext from "../DeviceContext.jsx";
import { useContext } from "react";
function WishlistSingleItem({
  item,
  uid,
  removeItemFromWishlist,
  fetchCartHandler,
}) {
  const { isMobile } = useContext(DeviceContext);
  async function addToCart() {
    await fetch(`${process.env.REACT_APP_URI}:3000/Cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Transfer-Encoding": "chunked",
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
        to={`${process.env.REACT_APP_URI}/products/product?cat=${item.cat}&subcat=${item.subcat}&id=${item.productId}`}
        className="flex flex-column justify-content items-center"
      >
        <img src={item.img} alt={item.name} className="item-icons" />
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
