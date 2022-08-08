import { Link } from "react-router-dom";
import ArtistDen from "../../images/Artists.jpeg";
import Camlin from "../../images/Camlin.jpeg";
import Canvas from "../../images/canvas.jpeg";
import OilCanvas from "../../images/canvas_oil.jpeg";
import Gessos from "../../images/gessos.jpeg";
import MontMarte from "../../images/Mont.jpeg";
import PigmentLiners from "../../images/pigment_liners.jpeg";
import WaterColor from "../../images/water_colour.jpeg";
import Winsor from "../../images/Winson.jpeg";
import DeviceContext from "../DeviceContext.jsx";
import { useContext } from "react";
function DisplayProducts() {
  const isMobile = useContext(DeviceContext);
  let categories = [
    { cat: "Paints", subcat: "Water Colours", img: WaterColor },
    { cat: "Painting Medium", subcat: "Gessos and Grounds", img: Gessos },
    { cat: "Canvas", subcat: "Canvas Boards", img: OilCanvas },
    { subcat: "Oil Brushes", cat: "Brushes", img: ArtistDen },
    { cat: "Pens and Markers", subcat: "Pigment Liners", img: PigmentLiners },
  ];

  let brands = [
    { brand: "Camlin", img: Camlin },
    { brand: "Camel", img: Canvas },
    { brand: "Artist's Den", img: ArtistDen },
    { brand: "Winsor & Newton", img: Winsor },
    { brand: "Mont Marte", img: MontMarte },
  ];

  return (
    <>
      <article className="pa5 pb2">
        <h3>Featured Category</h3>
        <section className="flex  flex-wrap">
          {categories.map((obj) => (
            <Link
              key={obj.subcat}
              to={`/products/${obj.cat.split(" ").join("-")}/${obj.subcat
                .split(" ")
                .join("-")}`}
            >
              <div
                className={`bn shadow-1 pa2 ma4 ${
                  isMobile ? "w3 h3" : "w4 h4"
                } br-100 flex justify-center items-center`}
                style={{
                  backgroundImage: `url(${obj.img})`,
                  backgroundSize: "cover",
                }}
              >
                <button className="bg-white bn br-100 btn">{obj.subcat}</button>
              </div>
            </Link>
          ))}
        </section>
      </article>
      <article className="pa5 pa2">
        <h3>Featured Brands</h3>
        <section className="flex  flex-wrap">
          {brands.map((brand) => (
            <Link
              key={brand.brand}
              to={`/products/brands?brand=${encodeURIComponent(brand.brand)}`}
            >
              <div
                style={{
                  backgroundImage: `url(${brand.img})`,
                  backgroundSize: "cover",
                }}
                className={`bn shadow-1 pa2 ma4 ${
                  isMobile ? "w3 h3" : "w4 h4"
                } br-100 flex justify-center items-center`}
              >
                <button className="bg-white bn br-100 btn">
                  {brand.brand}
                </button>
              </div>
            </Link>
          ))}
        </section>
      </article>
    </>
  );
}

export default DisplayProducts;
