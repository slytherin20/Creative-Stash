import { useState, useEffect, useContext, MouseEvent,FocusEvent } from "react";
import { Link } from "react-router-dom";
import DeviceContext from "../DeviceContext";
import { Image } from "../../interfaces/app_interface";


function Carousel({ images }:{images:Image[]}) {
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

  const changeImage=function(e:MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) {
    setActive(Number((e.target as HTMLButtonElement).dataset.index));
  }
  const defaultClass = "thumbnail br-100";
  return (
    <div className="carousel flex items-center flex-column vh-50 mt3">
      <Link
        to={images[active].link}
        className={isMobile ? "slide mobile-carousel" : "slide vh-50"}
      >
        <img
          src={images[active].original}
          alt="banner"
          className="w-100 h-100"
        />
      </Link>
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
