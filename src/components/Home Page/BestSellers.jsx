import { useState, useEffect } from "react";
import Item from "./Item.jsx";

function BestSellers() {
  const [best, setBest] = useState([]);

  useEffect(() => {
    requestData();
  }, []);

  async function requestData() {
    let res = await fetch("http://localhost:3000/Best-Sellers");
    let data = await res.json();
    setBest(data);
  }

  return <Item items={best} title="Best Sellers" />;
}
export default BestSellers;
