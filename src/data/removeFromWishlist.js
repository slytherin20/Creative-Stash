async function removeFromWishlist(id) {
  return await fetch(`http://localhost:3000/Wishlist/${id}`, {
    method: "DELETE",
  });
}

export default removeFromWishlist;
