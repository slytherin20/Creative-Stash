import { useContext } from "react";
import Loading from "../Modals/Loading";
import NotFound from "../NotFound";
import OrderList from "./OrderList";
import { AuthContext } from "../App";
function ShowOrders() {
  const user = useContext(AuthContext);
  return user === undefined ? (
    <Loading />
  ) : user === null ? (
    <NotFound />
  ) : (
    <OrderList  />
  );
}

export default ShowOrders;
