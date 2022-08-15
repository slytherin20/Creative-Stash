async function fetchOrderItem(orderId) {
  let res = await fetch(
    `${
      process.env.NODE_ENV == "production"
        ? process.env.REACT_APP_URI
        : "http://localhost"
    }:3000/orders/${orderId}`,
    {
      headers: {
        "Transfer-Encoding": "chunked",
      },
    }
  );
  let data = await res.json();
  return data;
}

export default fetchOrderItem;
