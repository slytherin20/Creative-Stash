async function checkItemWishlisted(productId) {
  let res = await fetch(
    `${process.env.REACT_APP_MOCKBACKEND}/Wishlist/${productId}`,
    {
      headers: {
        "Transfer-Encoding": "gzip",
        Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
      },
    }
  );
  if (res.status == 400 || !res.ok) return [false, -1];
  else {
    let item = await res.json();
    return item.wishlist.length > 0 ? [true, item.wishlist[0].id] : [false, -1];
  }
}

export default checkItemWishlisted;
