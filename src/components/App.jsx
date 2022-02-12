import Navbar from "./Header/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import MainPage from "../components/Home Page/MainPage.jsx";
import ShowAllProducts from "./ProductPage/ShowAllProducts.jsx";
import ShowProducts from "./ProductPage/ShowProducts.jsx";
import NotFound from "./NotFound.jsx";
function App() {
  return (
    <main className="sans-serif overflow-hidden">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/products/:id" element={<ShowAllProducts />} />
        <Route path="/products/:id/:id" element={<ShowProducts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
