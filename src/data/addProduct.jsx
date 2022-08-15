async function addProduct(inputs) {
  let generateId = Date.now();
  let productDetails = {
    cat: inputs.cat,
    subcat: inputs.subcat,
    name: inputs.name,
    brand: inputs.brand,
    price: Number(inputs.price),
    description: inputs.description,
    count: Number(inputs.count),
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
    `${
      process.env.NODE_ENV == "production"
        ? process.env.REACT_APP_URI
        : "http://localhost"
    }:3000/${inputs.cat.split(" ").join("_")}-${inputs.subcat
      .split(" ")
      .join("_")}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Transfer-Encoding": "chunked",
      },
      body: JSON.stringify(productDetails),
    }
  );

  let addBrandsToDB = fetch(
    `${
      process.env.NODE_ENV == "production"
        ? process.env.REACT_APP_URI
        : "http://localhost"
    }:3000/BrandSearch`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Transfer-Encoding": "chunked",
      },
      body: JSON.stringify(newBrand),
    }
  );
  let resStatus;
  return Promise.all([addProductToDB, addBrandsToDB])
    .then((res) => {
      if (res.ok || res.status == 201) {
        resStatus = res.status;
        return "success";
      } else {
        return "error";
      }
    })
    .catch(() => {
      if (resStatus == 201) return "success";
      return "error";
    });
}

export default addProduct;
