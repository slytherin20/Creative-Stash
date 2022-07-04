import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import addAnonymousCartItems from "../../data/addAnonymousCartItems.jsx";
import SendPasswordPage from "./SendPasswordPage.jsx";
function Form({ changeForm, closePopup, changeModalContent }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMessage] = useState("");
  const [emailField, setEmailField] = useState(false);
  const navigate = useNavigate();
  const path = useLocation();
  let currentPage = path.pathname.split("/");
  currentPage = currentPage[currentPage.length - 1];
  function authenticateUser(e) {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        addAnonymousCartItems(auth.currentUser.uid);
        closePopup();
        if (currentPage === "cart") navigate("/cart");
      })
      .catch(() =>
        setErrorMessage("Login Issue. Please signup if not registered already.")
      );
  }

  return (
    <>
      {emailField ? (
        <SendPasswordPage
          changeModalContent={changeModalContent}
          changeForm={changeForm}
        />
      ) : (
        <div className="h-75 flex flex-column justify-center items-center">
          <form
            className="ma2 flex flex-column items-center justify-between h-90"
            onSubmit={authenticateUser}
          >
            <div className="flex flex-column ma2">
              <label htmlFor="email-id">E-mail:</label>
              <input
                type="email"
                placeholder="Enter E-mail Id"
                required
                id="email-id"
                className="bn h2 w5 login-details"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-column ma2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                placeholder="Enter Password"
                required
                id="password"
                className="h2 w5 bn login-details"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn bg-purple w5 h2 white">
              Login
            </button>
          </form>
          <button
            className="purple bg-white bn btn"
            onClick={() => setEmailField(true)}
          >
            Forgot Password?
          </button>
          <p className="red">{error}</p>
          <button
            className="btn bg-white purple w5 h2 bn b shadow-4 pa1 mt4"
            onClick={() => changeForm("signup")}
          >
            Not Registered? Sign Up!
          </button>
        </div>
      )}
    </>
  );
}

export default Form;
