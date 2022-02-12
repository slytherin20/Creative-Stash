import { Link } from "react-router-dom";
function ShowSubCategories({ options, changeSubCatStatus, category }) {
  return (
    <ul
      className="flex flex-column w-100 nav-list bg-white"
      onMouseLeave={() => changeSubCatStatus(false)}
      onBlur={() => changeSubCatStatus(false)}
    >
      {options.map((subcat) => (
        <Link
          to={`/products/${category.split(" ").join("-")}/${subcat
            .split(" ")
            .join("-")}`}
          key={subcat}
        >
          <li className="list f5 pa1 black">{subcat}</li>
        </Link>
      ))}
    </ul>
  );
}

export default ShowSubCategories;
