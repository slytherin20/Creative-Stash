async function fetchBillingAddress(uid) {
  if (!uid) return;
  let res = await fetch(
    `${process.env.REACT_APP_MOCKBACKEND}/Address?id=${uid}`,
    {
      headers: {
        "Transfer-Encoding": "gzip",
      },
    }
  );
  let data = await res.json();
  return data;
}

export default fetchBillingAddress;
