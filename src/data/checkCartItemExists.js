async function checkCartItemExists(item, user) {
  let id = item.productId ? item.productId : item.id;

  let res = await fetch(
    `${process.env.REACT_APP_MOCKBACKEND}/Cart?uid=${user}&&id=${id}`
  );
  let data = await res.json();
  return data;
}

export default checkCartItemExists;
