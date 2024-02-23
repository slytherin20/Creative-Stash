export async function createOrderslist(tokenId) {
  let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tokenId,
    }),
  });
  return res.status;
}
