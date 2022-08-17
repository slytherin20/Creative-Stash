import { useState, useEffect } from "react";
import Items from "./Items.jsx";

function BestSellers({ fetchCartHandler }) {
  const [best, setBest] = useState([]);

  useEffect(() => {
    requestData();
  }, []);

  async function requestData() {
    let res = await fetch(`${process.env.REACT_APP_MOCKBACKEND}/Best-Sellers`, {
      headers: {
        "Transfer-Encoding": "gzip",
      },
    });
    let data = await res.json();
    setBest(data);
  }

  return (
    <Items
      items={best}
      title="Best Sellers"
      cat={false}
      subcat={false}
      fetchCartHandler={fetchCartHandler}
    />
  );
}
export default BestSellers;
