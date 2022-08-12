async function fetchOrderItem(orderId) {
  let res = await fetch(`http://localhost:3000/orders/${orderId}`, {
    headers: {
      "Transfer-Encoding": "chunked",
    },
  });
  let data = await res.json();
  return data;
}

export default fetchOrderItem;
