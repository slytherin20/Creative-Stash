import Navbar from "./Header/Navbar.jsx";
import MainPage from "../components/Home Page/MainPage.jsx";
import LoginModal from "./Login/Modal.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <main className="sans-serif overflow-hidden">
      <Navbar />
      <MainPage />
      <Routes>
        <Route path="/login" element={<LoginModal />} />
      </Routes>
    </main>
  );
}

export default App;
