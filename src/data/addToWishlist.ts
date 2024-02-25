import { Product, WishlistItem } from "../interfaces/app_interface";

async function addToWishlist(item:Product, uid:string):Promise<void> {
  let generatedTime = Date.now();
  let id = generatedTime + uid;
  let updatedItem:WishlistItem = {
    ...item,
    id: id,
    productId: item.id,
  };

  await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Transfer-Encoding": "gzip",
    },
    body: JSON.stringify({
      item: updatedItem,
      tokenId: sessionStorage.getItem("tokenId"),
    }),
  });
  return;
}

export default addToWishlist;
