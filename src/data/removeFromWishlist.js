async function removeFromWishlist(id) {
  return await fetch(
    `${
      process.env.NODE_ENV == "production"
        ? process.env.REACT_APP_URI
        : "http://localhost"
    }:3000/Wishlist/${id}`,
    {
      method: "DELETE",
      headers: {
        "Transfer-Encoding": "chunked",
      },
    }
  );
}

export default removeFromWishlist;
