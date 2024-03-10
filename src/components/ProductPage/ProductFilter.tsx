import { useState, useRef, ChangeEvent, MouseEvent } from "react";
import closeIcon from "../../images/close.png";
function ProductFilter({
  brands,
  filterProductsByChoice,
  resetProducts,
  isMobile,
  closeFilter,
}:{
  brands:string[],
  filterProductsByChoice: (price:number,checkedBrands:string[])=>void,
  resetProducts:()=>void,
  isMobile:boolean,
  closeFilter:()=>void
}) {
  const [price, setPrice] = useState(-1);
  const [checked, setChecked] = useState<boolean[]>(new Array(brands.length).fill(false));
  const formRef = useRef<HTMLFormElement | null>(null);

  function changeRange(e:ChangeEvent<HTMLInputElement>) {
    setPrice(Number(e.target.value));
  }

  function submitSelection() {
    let checkedBrands:string[] = [];
    if (checked.includes(true)) {
      checkedBrands = getBrandsName();
    }
    filterProductsByChoice(price, checkedBrands);
  }

  function getBrandsName() {
    let arr:string[] = [];
    for (let i = 0; i < checked.length; i++) {
      if (checked[i] === true) {
        arr.push(brands[i]);
      }
    }
    return arr;
  }

  function checkValue(index:number) {
    let temp = checked;
    temp[index] = !temp[index];
    setChecked(temp);
  }

  function resetFilter(e:MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if(formRef.current){
      formRef.current.reset();
      setPrice(-1);
      setChecked(new Array(brands.length).fill(false));
      resetProducts();
    }
  }
  return (
    <div
      className={`${
        isMobile ? "w-100 bg-white w-100 h-100 pl4 f4" : "w-30 ma3"
      } pa2`}
    >
      {isMobile ? (
        <button
          className="w2 h2 relative  close-pos bg-transparent bn"
          onClick={closeFilter}
        >
          <img src={closeIcon} alt="close filter" />
        </button>
      ) : (
        ""
      )}

      <h3 className="tc">Filters</h3>
      <form ref={formRef}>
        <div className="flex  justify-between align-center">
          <button
            type="button"
            onClick={submitSelection}
            className="btn bg-purple white pa1 ma1 w3"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={resetFilter}
            className="btn bg-white black pa1 ma1 w3 mr4"
          >
            Clear
          </button>
        </div>
        <div className="price-filter">
          <p className="b">Price</p>
          <div className="flex flex-column">
            <label htmlFor="<500">
              <input
                type="radio"
                name="price"
                value="500"
                onChange={changeRange}
                className="mr2"
              />
              Less than ₹500
            </label>
            <label htmlFor="500-1000">
              <input
                type="radio"
                name="price"
                value="1000"
                onChange={changeRange}
                className="mr2"
              />
              Between ₹500 and ₹1000
            </label>
            <label htmlFor="1000-1500">
              <input
                type="radio"
                name="price"
                value="1500"
                onChange={changeRange}
                className="mr2"
              />
              Between ₹1000 and ₹1500
            </label>
            <label htmlFor="1000-2000">
              <input
                type="radio"
                name="price"
                value="2000"
                onChange={changeRange}
                className="mr2"
              />
              Between ₹1500 and ₹2000
            </label>
            <label htmlFor="2000+">
              <input
                type="radio"
                name="price"
                value="200000"
                onChange={changeRange}
                className="mr2"
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
                <input
                  type="checkbox"
                  onChange={() => checkValue(index)}
                  className="mr2"
                />
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
