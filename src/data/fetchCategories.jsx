async function fetchCategories() {
  let res = await fetch(
    `${process.env.REACT_APP_MOCKBACKEND}/dashboard/Categories`,
    {
      headers: {
        "Transfer-Encoding": "gzip",
      },
    }
  );
  let categories = await res.json();
  return categories;
}

export default fetchCategories;
