import { useEffect, useState } from "react";
import Carousel from "./Carousel.jsx";

function Highlight() {
  const [images, setImages] = useState();

  useEffect(() => {
    requestImages();
  }, []);

  async function requestImages() {
    let res = await fetch(
      `${
        process.env.NODE_ENV == "production"
          ? process.env.REACT_APP_URI
          : "http://localhost"
      }:3000/Carousel`,
      {
        headers: {
          "Transfer-Encoding": "chunked",
        },
      }
    );
    let images = await res.json();
    setImages(images);
  }

  return (
    <div className="flex justify-center corousel-slides vh-50">
      <Carousel images={images} />
    </div>
  );
}

export default Highlight;
