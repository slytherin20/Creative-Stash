import { Route, Routes } from "react-router-dom";
import Navbar from "../Header/Navbar.jsx";
import NotFound from "../NotFound.jsx";
import Admin from "./Admin.jsx";
function AdminPortal({ userid }) {
  return (
    <main className="sans-serif overflow-hidden">
      <Navbar user={userid} admin={true} />
      <Routes>
        <Route path="/admin-page" element={<Admin userUID={userid} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default AdminPortal;
