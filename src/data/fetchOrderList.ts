import { OrderDoc } from "../interfaces/app_interface";

async function fetchOrderList() {
  let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Orders`, {
    headers: {
      "Transfer-Encoding": "gzip",
      Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
    },
  });
  let orderList:OrderDoc = await res.json();
  return orderList;
}

export default fetchOrderList;
