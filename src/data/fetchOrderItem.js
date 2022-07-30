async function fetchOrderItem(orderId) {
  let res = await fetch(`http://localhost:3000/orders/${orderId}`);
  let data = await res.json();
  return data;
}

export default fetchOrderItem;
