async function fetchOrderList() {
  let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Orders`, {
    headers: {
      "Transfer-Encoding": "gzip",
      Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
    },
  });
  let orderList = await res.json();
  return orderList;
}

export default fetchOrderList;
