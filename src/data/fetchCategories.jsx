import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase_config.js";
async function fetchCategories() {
  const docRef = doc(db, "Categories", "OcX5bdTdzBYVt1ItoOYq");
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export default fetchCategories;
