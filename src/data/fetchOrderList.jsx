async function fetchOrderList(uid) {
  let res = await fetch(
    `${
      process.env.NODE_ENV == "production"
        ? process.env.REACT_APP_URI
        : "http://localhost"
    }:3000/Orders?uid=${uid}`,
    {
      headers: {
        "Transfer-Encoding": "chunked",
      },
    }
  );
  let orderList = await res.json();
  return orderList;
}

export default fetchOrderList;
