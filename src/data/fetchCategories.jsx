async function fetchCategories() {
  let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Categories`, {
    headers: {
      "Transfer-Encoding": "chunked",
    },
  });
  let categories = await res.json();
  return categories;
}

export default fetchCategories;
