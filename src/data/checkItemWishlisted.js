async function checkItemWishlisted(uid, productId) {
  let res = await fetch(
    `http://localhost:3000/Wishlist?uid=${uid}&&productId=${productId}`
  );
  if (res.status == 400 || !res.ok) return [false, -1];
  else {
    let item = await res.json();
    return [true, item[0].id];
  }
}

export default checkItemWishlisted;
