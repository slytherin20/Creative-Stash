async function checkItemWishlisted(productId) {
  let res = await fetch(
    `${process.env.REACT_APP_MOCKBACKEND}/Wishlist/${productId}`,
    {
      headers: {
        "Transfer-Encoding": "gzip",
        Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
        "Content-Type": "application/json",
      },
    }
  );
  if (res.status == 400 || !res.ok) return [false, -1];
  else {
    let item = await res.json();
    return item ? [true, item.id] : [false, -1];
  }
}

export default checkItemWishlisted;
