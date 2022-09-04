import { useState, useEffect, useContext } from "react";
import DeviceContext from "../DeviceContext.jsx";
function Carousel({ images }) {
  const [active, setActive] = useState(0);
  const { isMobile } = useContext(DeviceContext);
  useEffect(() => {
    let timer = setInterval(() => {
      setActive(active + 1 > 3 ? 0 : active + 1);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [active]);

  function changeImage(e) {
    setActive(Number(e.target.dataset.index));
  }
  const defaultClass = "thumbnail br-100";
  return (
    <div className="carousel flex items-center flex-column vh-50 mt3">
      <img
        src={images[active].original}
        alt="banner"
        className={isMobile ? "slide mobile-carousel" : "slide vh-50"}
      />
      <div className="thumbnails w4 flex justify-between mt2">
        {images.map((img, i) => {
          return (
            <button
              key={img.id}
              className={i === active ? `${defaultClass} active` : defaultClass}
              data-index={i}
              onClick={changeImage}
              onBlur={changeImage}
            ></button>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
