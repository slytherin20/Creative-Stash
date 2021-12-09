import Item from "./Item.jsx";
import { useState, useEffect } from "react";
function NewArrival() {
  const [arrivals, setArrivals] = useState([]);

  useEffect(() => {
    requestData();
  }, []);

  async function requestData() {
    let res = await fetch("http://localhost:3000/New-Arrivals");
    let data = await res.json();
    setArrivals(data);
  }

  return <Item items={arrivals} title="New Arrivals" />;
}

export default NewArrival;
