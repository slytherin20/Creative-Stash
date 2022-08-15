async function removeFromWishlist(id) {
  return await fetch(`${process.env.REACT_APP_URI}:3000/Wishlist/${id}`, {
    method: "DELETE",
    headers: {
      "Transfer-Encoding": "chunked",
    },
  });
}

export default removeFromWishlist;
