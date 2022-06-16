import { doc, setDoc } from "firebase/firestore";
import { ref, getStorage, uploadString } from "firebase/storage";
import { db } from "../firebase_config.js";
async function addProduct(inputs) {
  let generateId = Date.now();
  const storage = getStorage();
  const docRef = doc(
    db,
    `products/${inputs.cat}/${inputs.subcat}`,
    String(generateId)
  );

  const imageRef = ref(storage, `images/${generateId}`);

  let addProductDetails = setDoc(docRef, {
    cat: inputs.cat,
    subcat: inputs.subcat,
    name: inputs.name,
    brand: inputs.brand,
    price: inputs.price,
    description: inputs.description,
    count: inputs.count,
    status: true,
    id: generateId,
  });
  let addProductImg = uploadString(imageRef, inputs.imgSrc, "data_url");

  return Promise.all([addProductDetails, addProductImg])
    .then(() => "success")
    .catch(() => "error");
}

export default addProduct;
