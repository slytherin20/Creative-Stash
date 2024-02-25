import { OrderItem } from "../interfaces/app_interface";

async function fetchOrderItem(orderId:number):Promise<OrderItem> {
  let res = await fetch(
    `${process.env.REACT_APP_MOCKBACKEND}/Orders/${orderId}`,
    {
      headers: {
        "Transfer-Encoding": "gzip",
        Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
      },
    }
  );
  let data:OrderItem = await res.json();
  return data;
}

export default fetchOrderItem;
