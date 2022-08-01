import { Link } from "react-router-dom";
function WishlistSingleItem({
  item,
  uid,
  removeItemFromWishlist,
  fetchCartHandler,
}) {
  async function addToCart() {
    await fetch(`http://localhost:3000/Cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    <div className="flex flex-column justify-center w-20 items-center pa2">
      <img src={item.img} alt={item.name} className="item-icons" />
      <p className="ma0 mt2">{item.name}</p>
      <p className="ma0 mt2 f6">{item.description.slice(0, 40)}...</p>
      <p>Price: ₹{item.price}</p>
      {item.status ? "" : <p className="red">Out of Stock</p>}
      <div className="flex justify-around w-80">
        <button onClick={() => removeItemFromWishlist(item.id)}>Heart</button>
        <Link
          to={`/products/product?cat=${item.cat}&subcat=${item.subcat}&id=${item.productId}`}
        >
          <button className=" btn buy-btn mr2 h2 bg-purple white f6 br1">
            Visit
          </button>
        </Link>
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

export default WishlistSingleItem;
