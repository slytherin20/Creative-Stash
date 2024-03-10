import Item from "./Item";
import { useContext } from "react";
import checkCartItemExists from "../../data/checkCartItemExists";
import { AuthContext } from "../App";
import { Product } from "../../interfaces/app_interface";

function Items({ items, title, cat, subcat, fetchCartHandler }:{
  items:Product[],
  title:string,
  cat:string,
  subcat:string,
  fetchCartHandler:()=>Promise<void>
}) {
  const user = useContext(AuthContext);

  async function addToCart(item:Product) {
    if (user) {
      //Save to user cart
      let itemExists = await checkCartItemExists<Product>(item);
      if (itemExists && itemExists.length > 0) {
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
          .then(() => fetchCartHandler())
          .catch((err) => console.log(err));
      } else {
        await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Transfer-Encoding": "gzip",
          },
          body: JSON.stringify({
            item: {
              ...item,
              cartCount: 1,
            },
            tokenId: sessionStorage.getItem("tokenId"),
          }),
        })
          .then(() => fetchCartHandler())
          .catch((err) => console.log(err));
      }
    } else {
      //For anonymyous users
      let cart:string = localStorage.getItem("cart") ||'';
      if (cart) {
       let newCart:string[] = [
          cart,
          `${item.cat.split(" ").join("-")}|${item.subcat
            .split(" ")
            .join("-")}|${item.id}|1`,
        ];
        localStorage.setItem("cart", String(newCart));
      } else {
        localStorage.setItem("cart", String([
          `${item.cat.split(" ").join("-")}|${item.subcat
            .split(" ")
            .join("-")}|${item.id}|1`,
        ]));
      }
      fetchCartHandler();
    }
  }
  return (
    <div className="w-100 pa2 h-100">
      <p className="f3 ml3">{title}</p>
      <div className="w-100 flex h-100 flex-wrap">
        {items.length != 0 &&
          items.map((item) => (
            <Item
              
              item={item}
              cat={cat}
              subcat={subcat}
              addToCart={addToCart}
            />
          ))}
      </div>
    </div>
  );
}

export default Items;
