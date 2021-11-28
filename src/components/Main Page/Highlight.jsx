import { useEffect, useState } from "react";
function Highlight() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    requestImages();
  }, []);

  async function requestImages() {
    let res = await fetch("http://localhost:3000/Carousel");
    let images = await res.json();
    setImages(images);
  }

  return (
    <div className="flex justify-center corousel-slides vh-50">
      {images.length !== 0 && (
        <img className="slide vh-50" src={images[0].original} alt="banner" />
      )}
    </div>
  );
}

export default Highlight;
