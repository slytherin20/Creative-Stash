async function fetchBillingAddress(uid) {
  if (!uid) return;
  let res = await fetch(`http://localhost:3000/Address?id=${uid}`, {
    headers: {
      "Transfer-Encoding": "chunked",
    },
  });
  let data = await res.json();
  return data;
}

export default fetchBillingAddress;
