import { useState, useEffect } from "react";

function Carousel({ images }) {
  const [active, setActive] = useState(0);

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
      <img src={images[active].original} alt="banner" className="slide vh-50" />
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

Carousel.defaultProps = {
  images: [
    {
      id: 0,
      original:
        "https://www.creativehands.in/wp-content/uploads/2021/10/COMBO_OFFER_BANNER-768x439.jpg",
    },
  ],
};
export default Carousel;
