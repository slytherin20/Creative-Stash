import { ReturnMsg } from "../enum/app_enums";
import { Brand, Product } from "../interfaces/app_interface";

async function addProduct(inputs) {
  let generateId = Date.now();
  let productDetails:Product = {
    cat: inputs.cat,
    subcat: inputs.subcat,
    name: inputs.name,
    brand: inputs.brand,
    price: Number(inputs.price),
    description: inputs.description,
    count: Number(inputs.count),
    status: true,
    id: generateId,
    cloudinaryId:""
  };

  let newBrand:Brand = {
    brand: inputs.brand,
    cat: inputs.cat,
    subcat: inputs.subcat,
    id: generateId,
  };
 
  async function addImageToDB():Promise<void> {
    let formdata = new FormData();
    formdata.append("file", inputs.img);
    let tokenId:string= sessionStorage.getItem("tokenId") || '';
    formdata.append("tokenId", tokenId);
    let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/images`, {
      method: "POST",
      body: formdata,
    });
    let data = await res.json();
    productDetails.cloudinaryId = data.public_id;
  }

  return addImageToDB()
    .then(async ():Promise<ReturnMsg> => {
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
        return ReturnMsg.SUCCESS;
      } catch (err) {
        return ReturnMsg.ERROR;
      }
    })
    .catch(() => {
      return ReturnMsg.ERROR;
    });
}

export default addProduct;
