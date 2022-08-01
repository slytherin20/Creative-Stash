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
    let res = await fetch(`http://localhost:3000/Wishlist?uid=${user}`);
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
        <article>
          {wishlistItems.map((item) => (
            <WishlistSingleItem
              key={item.id}
              item={item}
              uid={user}
              fetchCartHandler={fetchCartHandler}
              removeItemFromWishlist={removeItemFromWishlistHandler}
            />
          ))}
        </article>
      );
  }
}

export default Wishlist;