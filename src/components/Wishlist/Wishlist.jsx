import { useState, useEffect } from "react";
import Loading from "../Modals/Loading.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NotFound from "../NotFound.jsx";
import WishlistSingleItem from "./WishlistSingleItem.jsx";
import removeFromWishlist from "../../data/removeFromWishlist.js";

function Wishlist({ fetchCartHandler }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useState(undefined);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user.uid);
    } else setUser(null);
  });

  useEffect(() => {
    if (typeof user === "string" && wishlistItems.length === 0) {
      fetchWishlistItems();
    }
  }, [user]);

  async function fetchWishlistItems() {
    let res = await fetch(
      `${
        process.env.NODE_ENV == "production"
          ? process.env.REACT_APP_URI
          : "http://localhost"
      }:3000/Wishlist?uid=${user}`,
      {
        headers: {
          "Transfer-Encoding": "chunked",
        },
      }
    );
    let items = await res.json();
    setWishlistItems(items);
  }

  async function removeItemFromWishlistHandler(id) {
    await removeFromWishlist(id);
    fetchWishlistItems();
  }

  if (user === undefined) return <Loading />;
  else if (user === null) return <NotFound />;
  else {
    if (wishlistItems.length == 0) return <h2>Your Wishlist is empty</h2>;
    else
      return (
        <article className="pa2">
          <h2>Wishlist</h2>
          <div className="flex flex-wrap">
            {wishlistItems.map((item) => (
              <WishlistSingleItem
                key={item.id}
                item={item}
                uid={user}
                fetchCartHandler={fetchCartHandler}
                removeItemFromWishlist={removeItemFromWishlistHandler}
              />
            ))}
          </div>
        </article>
      );
  }
}

export default Wishlist;
