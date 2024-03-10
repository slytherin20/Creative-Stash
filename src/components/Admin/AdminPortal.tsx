import { Route, Routes } from "react-router-dom";
import Navbar from "../Header/Navbar";
import NotFound from "../NotFound";
import AddProducts from "./AddProducts";
import AdminHomepage from "./AdminHomepage";
import ShowOrdersReceived from "./ShowOrdersReceived";
function AdminPortal({ userid }:{userid:string}) {
  return (
    <main className="sans-serif overflow-hidden">
      <Navbar  admin={true} userid={userid} />
      <Routes>
        <Route path="/" element={<AdminHomepage />} />
        <Route
          path={`/add-products`}
          element={<AddProducts userUID={userid} />}
        />
        <Route path={`/orders-received`} element={<ShowOrdersReceived />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default AdminPortal;
