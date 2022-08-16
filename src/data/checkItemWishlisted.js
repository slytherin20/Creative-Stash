async function checkItemWishlisted(uid, productId) {
  let res = await fetch(
    `${process.env.REACT_APP_MOCKBACKEND}/Wishlist?uid=${uid}&&productId=${productId}`,
    {
      headers: {
        "Transfer-Encoding": "chunked",
      },
    }
  );
  if (res.status == 400 || !res.ok) return [false, -1];
  else {
    let item = await res.json();
    return [true, item[0].id];
  }
}

export default checkItemWishlisted;
