async function addProduct(inputs) {
  let generateId = Date.now();
  let productDetails = {
    cat: inputs.cat,
    subcat: inputs.subcat,
    name: inputs.name,
    brand: inputs.brand,
    price: inputs.price,
    description: inputs.description,
    count: inputs.count,
    status: true,
    id: generateId,
    img: inputs.imgSrc,
  };

  let newBrand = {
    brand: inputs.brand,
    cat: inputs.cat,
    subcat: inputs.subcat,
    id: generateId,
  };
  let addProductToDB = fetch(
    `http://localhost:3000/${inputs.cat.split(" ").join("_")}-${inputs.subcat
      .split(" ")
      .join("_")}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
      },
      body: JSON.stringify(productDetails),
    }
  );

  let addBrandsToDB = fetch("http://localhost:3000/BrandSearch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
    },
    body: JSON.stringify(newBrand),
  });
  let resStatus;
  return Promise.all([addProductToDB, addBrandsToDB])
    .then((res) => {
      if (res.ok || res.status == 201) {
        console.log("1.", res.status);
        resStatus = res.status;
        return "success";
      } else {
        return "error";
      }
    })
    .catch(() => {
      console.log("2.", resStatus);
      if (resStatus == 201) return "success";
      return "error";
    });
}

export default addProduct;
