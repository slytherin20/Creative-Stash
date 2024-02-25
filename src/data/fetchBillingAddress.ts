import { Address } from "../interfaces/app_interface";

async function fetchBillingAddress() {
  let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Address`, {
    headers: {
      "Transfer-Encoding": "gzip",
      Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
      "Content-Type": "application/json",
    },
  });
  let data:Address = await res.json();
  return data ? data.details : null;
}

export default fetchBillingAddress;
