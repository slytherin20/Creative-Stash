import Highlight from "./Highlight.jsx";
import Categories from "../Categories/Categories.jsx";
import DisplayProducts from "./DisplayProducts.jsx";
//import TodayDeals from "./TodayDeals.jsx";
// import NewArrival from "./NewArrival.jsx";
// import BestSellers from "./BestSellers.jsx";
function MainPage() {
  return (
    <div className="main-page">
      <Categories />
      <Highlight />
      <DisplayProducts />
      {
        //  <TodayDeals />
      }
      {/* <NewArrival fetchCartHandler={fetchCartHandler} />
      <BestSellers fetchCartHandler={fetchCartHandler} /> */}
    </div>
  );
}

export default MainPage;
