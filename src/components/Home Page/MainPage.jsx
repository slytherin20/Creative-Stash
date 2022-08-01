import Highlight from "./Highlight.jsx";
import Categories from "../Categories/Categories.jsx";
//import TodayDeals from "./TodayDeals.jsx";
// import NewArrival from "./NewArrival.jsx";
// import BestSellers from "./BestSellers.jsx";
function MainPage() {
  return (
    <div className="main-page">
      <Categories />
      <Highlight />
      {
        //  <TodayDeals />
      }
      {/* <NewArrival fetchCartHandler={fetchCartHandler} />
      <BestSellers fetchCartHandler={fetchCartHandler} /> */}
      <footer className="w-100 h3 bg-black white f4 tc flex items-center justify-center">
        Made with
        <span role="img" aria-label="love">
          ❤️
        </span>
        by Sonali
      </footer>
    </div>
  );
}

export default MainPage;
