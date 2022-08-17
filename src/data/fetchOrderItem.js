async function fetchOrderItem(orderId) {
  let res = await fetch(
    `${process.env.REACT_APP_MOCKBACKEND}/orders/${orderId}`,
    {
      headers: {
        "Transfer-Encoding": "gzip",
      },
    }
  );
  let data = await res.json();
  return data;
}

export default fetchOrderItem;
