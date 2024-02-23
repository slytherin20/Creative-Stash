import { Link } from "react-router-dom";
import HeartIcon from "../../images/hearted.png";
import DeviceContext from "../DeviceContext.jsx";
import { useContext } from "react";
import checkCartItemExists from "../../data/checkCartItemExists";

function WishlistSingleItem({
  item,
  removeItemFromWishlist,
  fetchCartHandler,
}) {
  const { isMobile } = useContext(DeviceContext);

  async function addToCart() {
    let itemExists = await checkCartItemExists(item);
    if (itemExists && itemExists.length > 0) {
      await fetch(
        `${process.env.REACT_APP_MOCKBACKEND}/Cart/${item.productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartCount: itemExists[0].cartCount + 1,
            tokenId: sessionStorage.getItem("tokenId"),
          }),
        }
      )
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
            cat: item.cat,
            subcat: item.subcat,
            name: item.name,
            description: item.description,
            id: item.productId,
            brand: item.brand,
            price: item.price,
            count: item.count,
            status: item.status,
            cloudinaryId: item.cloudinaryId,
            cartCount: 1,
          },
          tokenId: sessionStorage.getItem("tokenId"),
        }),
      })
        .then(() => fetchCartHandler())
        .catch((err) => console.log(err));
    }
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
        <img
          src={process.env.REACT_IMG_URL + item.cloudinaryId}
          alt={item.name}
          className="item-icons"
        />

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
