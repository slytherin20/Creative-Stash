import Navbar from "./Header/Navbar.jsx";
import MainPage from "../components/Home Page/MainPage.jsx";
import LoginSignUp from "./Modals/LoginSignUp.jsx";
import Form from "./Login/Form.jsx";
import SignUpForm from "./SignUp/SignUp.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <main className="sans-serif overflow-hidden">
      <Navbar />
      <MainPage />
      <Routes>
        <Route
          path="/login"
          element={
            <LoginSignUp
              title="Login"
              text="Login to show orders and buy items."
              form={<Form />}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <LoginSignUp
              title="Sign Up"
              text="Create account to shop your favourite items!"
              form={<SignUpForm />}
            />
          }
        />
      </Routes>
    </main>
  );
}

export default App;
