import Highlight from "./Highlight.jsx";
import Categories from "../Categories/Categories.jsx";
import TodayDeals from "./TodayDeals.jsx";
import NewArrival from "./NewArrival.jsx";
import BestSellers from "./BestSellers.jsx";
function MainPage() {
  return (
    <div className="main-page">
      <Categories />
      <Highlight />
      <TodayDeals />
      <NewArrival />
      <BestSellers />
    </div>
  );
}

export default MainPage;
