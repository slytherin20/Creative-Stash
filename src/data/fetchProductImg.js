async function fetchProductImg(id) {
  let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/images/${id}`);
  let img = await res.json();
  return img.img;
}

export default fetchProductImg;
