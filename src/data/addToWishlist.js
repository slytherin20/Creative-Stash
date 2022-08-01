async function addToWishlist(item, uid) {
  let generatedTime = Date.now();
  let id = generatedTime + uid;
  let updatedItem = {
    ...item,
    id: id,
    uid: uid,
    productId: item.id,
  };

  await fetch("http://localhost:3000/Wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedItem),
  });
  return;
}

export default addToWishlist;
