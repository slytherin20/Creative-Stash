import Navbar from "./Header/Navbar.jsx";
import MainPage from "../components/Home Page/MainPage.jsx";
import LoginForm from "./Login/LoginForm.jsx";
import { useState } from "react";
function App() {
  const [loginBtn, setLoginBtn] = useState(false);

  function changeLogin() {
    setLoginBtn(true);
  }

  return (
    <main className="sans-serif">
      <Navbar userClick={changeLogin} />
      <MainPage />
      {loginBtn && <LoginForm />}
    </main>
  );
}

export default App;
