async function addToWishlist(item, uid) {
  let generatedTime = Date.now();
  let id = generatedTime + uid;
  let updatedItem = {
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
