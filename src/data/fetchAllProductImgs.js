async function fetchAllProductImgs(items) {
  let promiseArr = items.map((item) => {
    if (item.productId) {
      return fetch(
        `${process.env.REACT_APP_MOCKBACKEND}/images/${item.productId}`
      );
    } else
      return fetch(`${process.env.REACT_APP_MOCKBACKEND}/images/${item.id}`);
  });
  let responses = await Promise.all(promiseArr);
  let images = await Promise.all(responses.map((res) => res.json()));
  return images;
}

export default fetchAllProductImgs;
