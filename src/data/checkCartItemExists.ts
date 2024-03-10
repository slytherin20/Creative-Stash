import { CartItem } from "../interfaces/app_interface";


async function checkCartItemExists<T1 extends {productId?:number,id:number|string}>(item:T1):Promise<CartItem[] | null> {
  let id:number|string;
  id = item.productId ? item.productId : item.id;

  let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart/${id}`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
      "Content-Type": "application/json",
    },
  });
  if (res.status == 404) return null;
  let data:CartItem[] = await res.json();

  return data;
}

export default checkCartItemExists;
