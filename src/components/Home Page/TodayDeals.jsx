import { useState, useEffect } from "react";
import Items from "./Items.jsx";
function TodayDeals() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    requestData();
  }, []);

  async function requestData() {
    let res = await fetch("http://localhost:3000/Todays-Deals");
    let data = await res.json();
    setDeals(data);
  }

  return (
    <Items items={deals} title="Deals of the day" cat={false} subcat={false} />
  );
}

export default TodayDeals;
