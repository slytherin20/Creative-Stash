import { useContext } from "react";
import Loading from "../Modals/Loading.jsx";
import NotFound from "../NotFound.jsx";
import OrderList from "./OrderList.jsx";
import { AuthContext } from "../App.jsx";
function ShowOrders() {
  const user = useContext(AuthContext);
  return user === undefined ? (
    <Loading />
  ) : user === null ? (
    <NotFound />
  ) : (
    <OrderList uid={user} />
  );
}

export default ShowOrders;
