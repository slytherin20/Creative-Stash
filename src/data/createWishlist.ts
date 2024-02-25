export async function createWishlist(tokenId:string) {
  let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tokenId,
    }),
  });
  return res.status;
}
