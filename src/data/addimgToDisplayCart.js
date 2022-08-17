function addImgToDisplayCart(imgs, items) {
  let mergedCart = items.map((item) => {
    let img = imgs.find((image) => item.id === image.id);
    if (img)
      return {
        ...item,
        img: img.img,
      };
    else return item;
  });
  return mergedCart;
}

export default addImgToDisplayCart;
