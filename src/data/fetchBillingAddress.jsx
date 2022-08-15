async function fetchBillingAddress(uid) {
  if (!uid) return;
  let res = await fetch(`${process.env.REACT_APP_URI}:3000/Address?id=${uid}`, {
    headers: {
      "Transfer-Encoding": "chunked",
    },
  });
  let data = await res.json();
  return data;
}

export default fetchBillingAddress;
