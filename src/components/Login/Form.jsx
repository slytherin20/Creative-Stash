import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
function Form({ changeForm }) {
  let email = "";
  let password = "";
  function authenticateUser(e) {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(
        (userCredentials) => console.log(userCredentials)
        //Close the modal
      )
      .catch((err) =>
        //Display User not exist message
        console.log(err.message)
      );
  }
  return (
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
            onChange={(e) => (email = e.target.value)}
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
            onChange={(e) => (password = e.target.value)}
          />
        </div>
        <button type="submit" className="btn bg-purple w5 h2 white">
          Login
        </button>
      </form>
      <button
        className="btn bg-white purple w5 h2 bn b shadow-4 pa1 mt4"
        onClick={() => changeForm("signup")}
      >
        Not Registered? Sign Up!
      </button>
    </div>
  );
}

export default Form;
