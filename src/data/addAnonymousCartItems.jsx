function addAnonymousCartItems(userid) {
  let cart = localStorage.getItem("cart");
  if (!cart) return [];
  let cartItems = cart.split(",");
  let newCartItems = [];
  let cartLength = cartItems.length;
  let noOfFetchedItems = 0;
  cartItems.forEach((item) => {
    item = item.split("-");
    let cat = item[0];
    let subcat = item[1];
    let itemId = item[2];
    let cartCount = Number(item[3]);

    fetch(`http://localhost:3000/${cat}-${subcat}?id=${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        data[0].cartCount = cartCount;
        data[0].uid = userid;
        newCartItems.push(...data);
        ++noOfFetchedItems;
        if (noOfFetchedItems === cartLength) addItemsToDB(newCartItems);
      });
  });
}

function addItemsToDB(items) {
  let itemsLength = items.length;
  items.forEach((item) => {
    fetch("http://localhost:3000/Cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then(() => {
        --itemsLength;
        if (itemsLength === 0) localStorage.removeItem("cart");
      })
      .catch((err) => console.log(err));
  });
}

export default addAnonymousCartItems;
