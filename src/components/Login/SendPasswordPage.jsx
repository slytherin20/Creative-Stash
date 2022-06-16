import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
function SendPasswordPage({ changeModalContent, changeForm }) {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  function sendMail(e) {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        changeModalContent("email sent");
      })
      .catch(() => {
        setErrorMessage("Account doesn't exist. Please register first.");
      });
  }
  return (
    <section className="flex flex-column h-100 w-90 items-center">
      <form
        className="forgot-password flex flex-column h-50 w-90 items-center"
        onSubmit={sendMail}
      >
        <h3>Password Reset</h3>
        <label
          htmlFor="email"
          className="f h-50 flex flex-column items-center justify-center"
        >
          Enter E-mail address:
          <input
            type="email"
            id="email"
            className="h2 w5 bn login-details"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn bg-purple w5 h2 white">
          Send E-mail
        </button>
        <p className="red">{errorMessage}</p>
      </form>
      <button
        className="btn bg-white purple w5 h2 bn b shadow-4 pa1 mt4"
        onClick={() => changeForm("signup")}
      >
        Not Registered? Sign Up!
      </button>
    </section>
  );
}

export default SendPasswordPage;
