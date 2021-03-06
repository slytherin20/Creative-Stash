import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
function Item({ items, title, cat, subcat, fetchCartHandler }) {
  const auth = getAuth();
  async function addToCart(item) {
    if (auth.currentUser) {
      //Save to user cart
      await fetch(`http://localhost:3000/Cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...item,
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
        cart = [
          cart,
          `${item.cat.split(" ").join("_")}-${item.subcat
            .split(" ")
            .join("_")}-${item.id}-1`,
        ];
        localStorage.setItem("cart", cart);
      } else {
        localStorage.setItem("cart", [
          `${item.cat.split(" ").join("_")}-${item.subcat
            .split(" ")
            .join("_")}-${item.id}-1`,
        ]);
      }
      fetchCartHandler();
    }
  }
  return (
    <div className="w-100 h-25 pa2">
      <p className="f3 ml3">{title}</p>
      <div className="w-100 flex h-100 flex-wrap">
        {items.length != 0 &&
          items.map((item) => (
            <div
              key={item.id}
              className="flex flex-column justify-center w-20 items-center pa2"
            >
              <img src={item.img} alt={item.name} className="item-icons" />
              <p className="ma0 mt2">{item.name}</p>
              <p className="ma0 mt2 f6">{item.description.slice(0, 40)}...</p>
              <p>Price: ₹{item.price}</p>
              <div className="flex justify-around w-80">
                {!cat ? (
                  <Link
                    to={`/products/product?cat=${
                      item.category.split("-")[0]
                    }&subcat=${item.category.split("-")[1]}&id=${item.id}`}
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
                <button
                  className=" btn buy-btn h2 bg-purple white f6 br1"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Item;
