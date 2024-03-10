import Highlight from "./Highlight";
import Categories from "../Categories/Categories";
import DisplayProducts from "./DisplayProducts";
import DeviceContext from "../DeviceContext";
import { useContext } from "react";

function MainPage() {
  const { isMobile } = useContext(DeviceContext);
  return (
    <div className="main-page">
      {isMobile ? "" : <Categories />}
      <Highlight />
      <DisplayProducts />
    </div>
  );
}

export default MainPage;
