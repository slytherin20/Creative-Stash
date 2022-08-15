import { Route, Routes } from "react-router-dom";
import Navbar from "../Header/Navbar.jsx";
import NotFound from "../NotFound.jsx";
import AddProducts from "./AddProducts.jsx";
import AdminHomepage from "./AdminHomepage.jsx";
import ShowOrdersReceived from "./ShowOrdersReceived.jsx";
function AdminPortal({ userid }) {
  return (
    <main className="sans-serif overflow-hidden">
      <Navbar user={userid} admin={true} />
      <Routes>
        <Route path={process.env.REACT_APP_URI} element={<AdminHomepage />} />
        <Route
          path={`${process.env.REACT_APP_URI}/add-products`}
          element={<AddProducts userUID={userid} />}
        />
        <Route
          path={`${process.env.REACT_APP_URI}/orders-received`}
          element={<ShowOrdersReceived />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default AdminPortal;
