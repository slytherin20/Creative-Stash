export async function createCart(tokenId:string) {
  let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart`, {
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
