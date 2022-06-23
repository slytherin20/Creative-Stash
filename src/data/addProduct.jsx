function addProduct(inputs) {
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
  return fetch(
    `http://localhost:3000/${inputs.cat.split(" ").join("_")}-${inputs.subcat
      .split(" ")
      .join("_")}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productDetails),
    }
  )
    .then((res) => (res.ok ? "success" : "error"))
    .catch(() => "error");
}

export default addProduct;
