async function fetchCategories() {
  let res = await fetch("http://localhost:3000/Categories");
  let categories = await res.json();
  return categories;
}

export default fetchCategories;
