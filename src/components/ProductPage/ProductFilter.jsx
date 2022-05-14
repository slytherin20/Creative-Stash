import { useState, useRef } from "react";

function ProductFilter({ brands, filterProductsByChoice, resetProducts }) {
  const [price, setPrice] = useState("-1");
  const [checked, setChecked] = useState(new Array(brands.length).fill(false));
  const formRef = useRef(null);
  function changeRange(e) {
    setPrice(e.target.value);
  }

  function submitSelection() {
    let checkedBrands = [];
    if (checked.includes(true)) {
      checkedBrands = getBrandsName();
    }
    filterProductsByChoice(price, checkedBrands);
  }

  function getBrandsName() {
    let arr = [];
    for (let i = 0; i < checked.length; i++) {
      if (checked[i] === true) {
        arr.push(brands[i]);
      }
    }
    return arr;
  }

  function checkValue(index) {
    let temp = checked;
    temp[index] = !temp[index];
    setChecked(temp);
  }

  function resetFilter(e) {
    e.preventDefault();
    formRef.current.reset();
    setPrice("-1");
    setChecked(new Array(brands.length).fill(false));
    resetProducts();
  }
  return (
    <div className="w-30 pa2">
      <h3 className="tc">Filters</h3>
      <form ref={formRef}>
        <button type="button" onClick={submitSelection}>
          Apply
        </button>
        <button type="button" onClick={resetFilter}>
          Clear
        </button>
        <div className="price-filter">
          <p className="b">Price</p>
          <div className="flex flex-column">
            <label htmlFor="<500">
              <input
                type="radio"
                name="price"
                value="500"
                onChange={changeRange}
              />
              Less than ₹500
            </label>
            <label htmlFor="500-1000">
              <input
                type="radio"
                name="price"
                value="1000"
                onChange={changeRange}
              />
              Between ₹500 and ₹1000
            </label>
            <label htmlFor="1000-1500">
              <input
                type="radio"
                name="price"
                value="1500"
                onChange={changeRange}
              />
              Between ₹1000 and ₹1500
            </label>
            <label htmlFor="1000-2000">
              <input
                type="radio"
                name="price"
                value="2000"
                onChange={changeRange}
              />
              Between ₹1500 and ₹2000
            </label>
            <label htmlFor="2000+">
              <input
                type="radio"
                name="price"
                value="200000"
                onChange={changeRange}
              />
              Greater than ₹2000
            </label>
          </div>
        </div>
        <div className="brands-filter flex flex-column">
          <p className="b">Brands</p>
          {brands.map((brand, index) => {
            return (
              <label htmlFor={brand} key={index}>
                <input type="checkbox" onChange={() => checkValue(index)} />
                {brand}
              </label>
            );
          })}
        </div>
      </form>
    </div>
  );
}

export default ProductFilter;
