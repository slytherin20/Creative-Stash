import Highlight from "./Highlight.jsx";
import Categories from "../Categories/Categories.jsx";
import DisplayProducts from "./DisplayProducts.jsx";
import DeviceContext from "../DeviceContext.jsx";
import { useContext } from "react";
//import TodayDeals from "./TodayDeals.jsx";
// import NewArrival from "./NewArrival.jsx";
// import BestSellers from "./BestSellers.jsx";
function MainPage() {
  const isMobile = useContext(DeviceContext);
  return (
    <div className="main-page">
      {isMobile ? "" : <Categories />}
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
