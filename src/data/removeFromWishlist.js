async function removeFromWishlist(id) {
  return await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Wishlist/${id}`, {
    method: "DELETE",
    headers: {
      "Transfer-Encoding": "gzip",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tokenId: sessionStorage.getItem("tokenId") }),
  });
}

export default removeFromWishlist;
