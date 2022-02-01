function ShowSubCategories({ options, changeSubCatStatus }) {
  return (
    <ul
      className="flex flex-column w-100 nav-list bg-white"
      onMouseLeave={() => changeSubCatStatus(false)}
      onBlur={() => changeSubCatStatus(false)}
    >
      {options.map((subcat) => (
        <li key={subcat} className="list f5 pa1 black">
          {subcat}
        </li>
      ))}
    </ul>
  );
}

export default ShowSubCategories;
