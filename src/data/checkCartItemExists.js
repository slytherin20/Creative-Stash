async function checkCartItemExists(item) {
  let id = item.productId ? item.productId : item.id;

  let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart/${id}`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
      "Content-Type": "application/json",
    },
  });
  if (res.status == 404) return null;
  let data = await res.json();

  return data;
}

export default checkCartItemExists;
