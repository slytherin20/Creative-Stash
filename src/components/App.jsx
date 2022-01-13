import Navbar from "./Header/Navbar.jsx";
import MainPage from "../components/Home Page/MainPage.jsx";
import LoginForm from "./Login/LoginForm.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <main className="sans-serif">
      <Navbar />
      <MainPage />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </main>
  );
}

export default App;
