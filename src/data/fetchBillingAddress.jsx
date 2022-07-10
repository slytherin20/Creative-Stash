async function fetchBillingAddress(uid) {
  if (!uid) return;
  let res = await fetch(`http://localhost:3000/Address?id=${uid}`);
  let data = await res.json();
  return data;
}

export default fetchBillingAddress;
