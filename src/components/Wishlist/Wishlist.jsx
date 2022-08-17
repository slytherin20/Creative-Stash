import { useState, useEffect } from "react";
import Loading from "../Modals/Loading.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NotFound from "../NotFound.jsx";
import WishlistSingleItem from "./WishlistSingleItem.jsx";
import removeFromWishlist from "../../data/removeFromWishlist.js";

function Wishlist({ fetchCartHandler }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
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
      `${process.env.REACT_APP_MOCKBACKEND}/Wishlist?uid=${user}`,
      {
        headers: {
          "Transfer-Encoding": "gzip",
        },
      }
    );
    let items = await res.json();
    setWishlistItems(items);
    setLoading(false);
  }

  async function removeItemFromWishlistHandler(id) {
    setLoading(true);
    await removeFromWishlist(id);
    fetchWishlistItems();
  }

  if (user === undefined) return <Loading />;
  else if (user === null) return <NotFound />;
  else {
    if (wishlistItems.length == 0 && !loading)
      return <h2>Your Wishlist is empty</h2>;
    else if (loading) return <Loading />;
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
