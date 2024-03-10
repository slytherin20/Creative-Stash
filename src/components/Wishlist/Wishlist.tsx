import { useState, useEffect, useContext } from "react";
import Loading from "../Modals/Loading";
import NotFound from "../NotFound";
import WishlistSingleItem from "./WishlistSingleItem";
import removeFromWishlist from "../../data/removeFromWishlist";
import { AuthContext } from "../App";
import { WishistDoc } from "../../interfaces/app_interface";

function Wishlist({ fetchCartHandler }:{
  fetchCartHandler:()=>Promise<void>
}) {
  const [wishlistItems, setWishlistItems] = useState<WishistDoc>();
  const [loading, setLoading] = useState<boolean>(true);
  const user = useContext(AuthContext);
  useEffect(() => {
    if (typeof user === "string" && !wishlistItems) {
      fetchWishlistItems();
    }
  }, [user]);

  async function fetchWishlistItems() {
    let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Wishlist`, {
      headers: {
        "Transfer-Encoding": "gzip",
        Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
      },
    });
    let items:WishistDoc = await res.json();
    setWishlistItems(items);
    setLoading(false);
  }

  async function removeItemFromWishlistHandler(id:string) {
    setLoading(true);
    await removeFromWishlist(id);
    fetchWishlistItems();
  }

  if (user === undefined) return <Loading />;
  else if (user === null) return <NotFound />;
  else {
    if (wishlistItems?.wishlist.length == 0 && !loading)
      return <h2>Your Wishlist is empty</h2>;
    else if (loading) return <Loading />;
    else
      return (
        <article className="pa2">
          <h2>Wishlist</h2>
          <div className="flex flex-wrap">
            {wishlistItems && wishlistItems?.wishlist.map((item) => (
              <WishlistSingleItem
                key={item.id}
                item={item}
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
