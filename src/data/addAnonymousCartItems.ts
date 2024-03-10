import { CartItem, Product } from "../interfaces/app_interface";
import checkCartItemExists from "./checkCartItemExists";

function addAnonymousCartItems():void {
  let cart:string|null = localStorage.getItem("cart");
  if (!cart) return;
  let cartItems:string[] = cart.split(",");
  let newCartItems:CartItem[] = [];
  let cartLength:number = cartItems.length;
  let noOfFetchedItems:number = 0;
  cartItems.forEach((item:string):void => {
    let itemArr:string[] = item.split("|");
    let cat = itemArr[0];
    let itemId = itemArr[2];
    let cartCount = Number(itemArr[3]);

    fetch(`${process.env.REACT_APP_MOCKBACKEND}/${cat}/${itemId}`, {
      headers: {
        "Transfer-Encoding": "gzip",
      },
    })
      .then((res) => res.json())
      .then((data:Product) => {
        let item:CartItem={
          ...data,
          cartCount:cartCount,
        }
        newCartItems.push(item);
        ++noOfFetchedItems;
        if (noOfFetchedItems === cartLength) addItemsToDB(newCartItems);
      });
  });
}

function addItemsToDB(items:CartItem[]):void {
  let itemsLength:number = items.length;
  items.forEach(async (item):Promise<void> => {
    let itemExists = await checkCartItemExists<CartItem>(item);
    if (itemExists && itemExists.length) {

      await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          cartCount: itemExists[0].cartCount + 1,
          tokenId: sessionStorage.getItem("tokenId"),
        }),
      })
        .then(() => {
          --itemsLength;
          if (itemsLength === 0) localStorage.removeItem("cart");
        })
        .catch((err) => console.log(err));
    } else {
      fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Transfer-Encoding": "gzip",
        },
        body: JSON.stringify({
          item,
          tokenId: sessionStorage.getItem("tokenId"),
        }),
      })
        .then(() => {
          --itemsLength;
          if (itemsLength === 0) localStorage.removeItem("cart");
        })
        .catch((err) => console.log(err));
    }
  });
}

export default addAnonymousCartItems;
