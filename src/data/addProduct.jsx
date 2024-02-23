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
  };

  let newBrand = {
    brand: inputs.brand,
    cat: inputs.cat,
    subcat: inputs.subcat,
    id: generateId,
  };

  async function addImageToDB() {
    let formdata = new FormData();
    formdata.append("file", inputs.img);
    formdata.append("tokenId", sessionStorage.getItem("tokenId"));
    let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/images`, {
      method: "POST",
      body: formdata,
    });
    let data = await res.json();
    productDetails.cloudinaryId = data.public_id;
  }

  return addImageToDB()
    .then(async () => {
      try {
        await fetch(
          `${process.env.REACT_APP_MOCKBACKEND}/${inputs.cat
            .split(" ")
            .join("-")}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Transfer-Encoding": "gzip",
            },
            body: JSON.stringify({
              details: productDetails,
              tokenId: sessionStorage.getItem("tokenId"),
            }),
          }
        );
        await fetch(
          `${process.env.REACT_APP_MOCKBACKEND}/dashboard/BrandSearch`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Transfer-Encoding": "gzip",
            },
            body: JSON.stringify({
              newBrand: newBrand,
              tokenId: sessionStorage.getItem("tokenId"),
            }),
          }
        );
        return "success";
      } catch (err) {
        return "error";
      }
    })
    .catch(() => {
      return "error";
    });
}

export default addProduct;
