import { Link } from "react-router-dom";
function ShowSubCategories({ options, changeSubCatStatus, category }) {
  return (
    <ul
      className="flex flex-column w-100 nav-list bg-white shadow-1"
      onMouseLeave={() => changeSubCatStatus(false)}
      onBlur={() => changeSubCatStatus(false)}
    >
      {options.map((subcat) => (
        <Link
          to={`${process.env.REACT_APP_URI}/products/${category
            .split(" ")
            .join("-")}/${subcat.split(" ").join("-")}`}
          key={subcat}
        >
          <li className="list f5 pa2 text-color">{subcat}</li>
        </Link>
      ))}
    </ul>
  );
}

export default ShowSubCategories;
