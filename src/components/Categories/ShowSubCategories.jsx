function ShowSubCategories({ options }) {
  return (
    <ul className="flex flex-column w-100 nav-list bg-white">
      {options.map((subcat) => (
        <li key={subcat} className="list f5 pa1 black">
          {subcat}
        </li>
      ))}
    </ul>
  );
}

export default ShowSubCategories;
