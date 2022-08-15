import Items from "./Items.jsx";
import { useState, useEffect } from "react";
function NewArrival({ fetchCartHandler }) {
  const [arrivals, setArrivals] = useState([]);

  useEffect(() => {
    requestData();
  }, []);

  async function requestData() {
    let res = await fetch(`${process.env.REACT_APP_URI}:3000/New-Arrivals`, {
      headers: {
        "Transfer-Encoding": "chunked",
      },
    });
    let data = await res.json();
    setArrivals(data);
  }

  return (
    <Items
      items={arrivals}
      title="New Arrivals"
      cat={false}
      subcat={false}
      fetchCartHandler={fetchCartHandler}
    />
  );
}

export default NewArrival;
