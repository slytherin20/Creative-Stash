import checkCartItemExists from "./checkCartItemExists";
function addAnonymousCartItems(userid) {
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

    fetch(`${process.env.REACT_APP_MOCKBACKEND}/${cat}?id=${itemId}`, {
      headers: {
        "Transfer-Encoding": "gzip",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data[0].cartCount = Number(cartCount);
        data[0].uid = userid;
        newCartItems.push(...data);
        ++noOfFetchedItems;
        if (noOfFetchedItems === cartLength) addItemsToDB(newCartItems, userid);
      });
  });
}

function addItemsToDB(items, userid) {
  let itemsLength = items.length;
  items.forEach(async (item) => {
    let itemExists = await checkCartItemExists(item, userid);
    if (itemExists.length > 0) {
      await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Cart/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...itemExists[0],
          cartCount: itemExists[0].cartCount + 1,
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
        body: JSON.stringify(item),
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
