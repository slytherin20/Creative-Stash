async function addToWishlist(item, uid) {
  let generatedTime = Date.now();
  let id = generatedTime + uid;
  let updatedItem = {
    ...item,
    id: id,
    uid: uid,
    productId: item.id,
  };

  await fetch(`${process.env.REACT_APP_URI}:3000/Wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked",
    },
    body: JSON.stringify(updatedItem),
  });
  return;
}

export default addToWishlist;
