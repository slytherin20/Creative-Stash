import PaintBanner from "../../images/banner1.png";
import WinsorBanner from "../../images/banner2.png";
import BrustroBanner from "../../images/banner3.png";
import CanvasBanner from "../../images/banner4.png";
import Carousel from "./Carousel.jsx";
import { useContext } from "react";
import DeviceContext from "../DeviceContext.jsx";
let images = [
  {
    id: 1,
    original: CanvasBanner,
  },
  {
    id: 2,
    original: WinsorBanner,
  },
  {
    id: 3,
    original: PaintBanner,
  },
  {
    id: 4,
    original: BrustroBanner,
  },
];
function Highlight() {
  const { isMobile } = useContext(DeviceContext);

  return (
    <div
      className={
        isMobile
          ? "flex justify-center corousel-slides mobile-carousel"
          : "flex justify-center corousel-slides vh-50"
      }
    >
      <Carousel images={images} />
    </div>
  );
}

export default Highlight;
