import { Categories } from "../interfaces/app_interface";

async function fetchCategories():Promise<Categories> {
  let res = await fetch(
    `${process.env.REACT_APP_MOCKBACKEND}/dashboard/Categories`,
    {
      headers: {
        "Transfer-Encoding": "gzip",
      },
    }
  );
  let categories:Categories = await res.json();
  return categories;
}

export default fetchCategories;
