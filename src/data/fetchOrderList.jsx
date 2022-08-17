async function fetchOrderList(uid) {
  let res = await fetch(
    `${process.env.REACT_APP_MOCKBACKEND}/Orders?uid=${uid}`,
    {
      headers: {
        "Transfer-Encoding": "gzip",
      },
    }
  );
  let orderList = await res.json();
  return orderList;
}

export default fetchOrderList;
