import { useState } from "react";

function Carousel({ images }) {
  const [active, setActive] = useState(0);

  function changeImage(e) {
    setActive(Number(e.target.dataset.index));
  }
  const defaultClass = "thumbnail br-100";
  return (
    <div className="carousel flex items-center flex-column vh-50">
      <img src={images[active].original} alt="banner" className="slide vh-50" />
      <div className="thumbnails w4 flex justify-between mt2">
        {images.map((img, i) => {
          return (
            <button
              key={img.id}
              className={i === active ? `${defaultClass} active` : defaultClass}
              data-index={i}
              onClick={changeImage}
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
