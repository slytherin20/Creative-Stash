import addToWishlist from "../../data/addToWishlist";
import checkItemWishlisted from "../../data/checkItemWishlisted";
import removeFromWishlist from "../../data/removeFromWishlist";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function Item({ item, uid, cat, subcat, addToCart }) {
  const [wishlist, setWishlist] = useState({ status: false, id: -1 });

  useEffect(() => {
    wishlistStatus(item.id);
  }, []);

  async function wishlistStatus(id) {
    let [status, wishlistId] = await checkItemWishlisted(uid, id);
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

  return (
    <div
      key={item.id}
      className="flex flex-column justify-center w-20 items-center pa2"
    >
      <img src={item.img} alt={item.name} className="item-icons" />
      <p className="ma0 mt2">{item.name}</p>
      <p className="ma0 mt2 f6">{item.description.slice(0, 40)}...</p>
      <p>Price: ₹{item.price}</p>
      {item.status ? "" : <p className="red">Out of Stock</p>}
      <div className="flex justify-around w-80">
        {wishlist.status ? (
          <button onClick={() => removeWishlisted(wishlist.id)}>Hearted</button>
        ) : (
          <button onClick={() => addWishlisted(item, uid)}>Heart</button>
        )}
        {!cat ? (
          <Link
            to={`/products/product?cat=${item.category.split("-")[0]}&subcat=${
              item.category.split("-")[1]
            }&id=${item.id}`}
          >
            <button className=" btn buy-btn mr2 h2 bg-purple white f6 br1">
              Visit
            </button>
          </Link>
        ) : (
          <Link
            to={`/products/product?cat=${
              cat.split("-")[0]
            }&subcat=${subcat}&id=${item.id}`}
          >
            <button className=" btn buy-btn  mr2 h2 bg-purple white f6 br1">
              Visit
            </button>
          </Link>
        )}
        {item.status ? (
          <button
            className=" btn buy-btn h2 bg-purple white f6 br1"
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Item;
