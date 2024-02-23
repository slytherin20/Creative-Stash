import checkCartItemExists from "./checkCartItemExists";
function addAnonymousCartItems() {
  let cart = localStorage.getItem("cart");
  if (!cart) return [];
  let cartItems = cart.split(",");
  let newCartItems = [];
  let cartLength = cartItems.length;
  let noOfFetchedItems = 0;
  cartItems.forEach((item) => {
    item = item.split("|");
    let cat = item[0];
    let itemId = item[2];
    let cartCount = Number(item[3]);

    fetch(`${process.env.REACT_APP_MOCKBACKEND}/${cat}/${itemId}`, {
      headers: {
        "Transfer-Encoding": "gzip",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.cartCount = Number(cartCount);
        newCartItems.push(data);
        ++noOfFetchedItems;
        if (noOfFetchedItems === cartLength) addItemsToDB(newCartItems);
      });
  });
}

function addItemsToDB(items) {
  let itemsLength = items.length;
  items.forEach(async (item) => {
    let itemExists = await checkCartItemExists(item);
    if (itemExists) {
      await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartCount: itemExists.cartCount + 1,
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
