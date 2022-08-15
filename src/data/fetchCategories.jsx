async function fetchCategories() {
  let res = await fetch(
    `${
      process.env.NODE_ENV == "production"
        ? process.env.REACT_APP_URI
        : "http://localhost"
    }:3000/Categories`,
    {
      headers: {
        "Transfer-Encoding": "chunked",
      },
    }
  );
  let categories = await res.json();
  return categories;
}

export default fetchCategories;
