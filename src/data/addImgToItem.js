function addImgToItem(imgs, items) {
  let mergedCart = items.map((item) => {
    let img = imgs.find((image) => item.productId === image.id);
    if (img)
      return {
        ...item,
        img: img.img,
      };
    else return item;
  });
  return mergedCart;
}

export default addImgToItem;
