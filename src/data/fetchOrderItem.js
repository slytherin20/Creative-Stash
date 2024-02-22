async function fetchOrderItem(orderId) {
  let res = await fetch(
    `${process.env.REACT_APP_MOCKBACKEND}/Orders/${orderId}`,
    {
      headers: {
        "Transfer-Encoding": "gzip",
        Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
      },
    }
  );
  let data = await res.json();
  return data;
}

export default fetchOrderItem;
