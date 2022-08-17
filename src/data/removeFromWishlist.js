async function removeFromWishlist(id) {
  return await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Wishlist/${id}`, {
    method: "DELETE",
    headers: {
      "Transfer-Encoding": "gzip",
    },
  });
}

export default removeFromWishlist;
