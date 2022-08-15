async function fetchOrderList(uid) {
  let res = await fetch(`${process.env.REACT_APP_URI}:3000/Orders?uid=${uid}`, {
    headers: {
      "Transfer-Encoding": "chunked",
    },
  });
  let orderList = await res.json();
  return orderList;
}

export default fetchOrderList;
