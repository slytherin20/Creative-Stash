import { useState, useEffect } from "react";
import Items from "./Items.jsx";
function TodayDeals() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    requestData();
  }, []);

  async function requestData() {
    let res = await fetch(`${process.env.REACT_APP_URI}:3000/Todays-Deals`, {
      headers: {
        "Transfer-Encoding": "chunked",
      },
    });
    let data = await res.json();
    setDeals(data);
  }

  return (
    <Items items={deals} title="Deals of the day" cat={false} subcat={false} />
  );
}

export default TodayDeals;
