async function fetchOrderList(uid) {
  let res = await fetch(`http://localhost:3000/Orders?uid=${uid}`);
  let orderList = await res.json();
  return orderList;
}

export default fetchOrderList;
