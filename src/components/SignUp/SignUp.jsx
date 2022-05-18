import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
function SignUpForm({ changeForm }) {
  let email = "";
  let password = "";
  let confirmPassword = "";

  function userAuth(e) {
    e.preventDefault();
    if (password === confirmPassword) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) =>
          //Hide modal and show user name instead of login button.
          sendEmailVerification(auth.currentUser).then(() =>
            console.log("email verification send!")
          )
        )
        .catch((err) => console.log(err.message))
        .catch((err) =>
          //Display error
          console.log(err.message)
        );
    } else {
      //display password not matched.
    }
  }

  return (
    <div className="h-75 flex flex-column justify-center items-center">
      <form
        className="ma2 flex flex-column items-center justify-between h-90"
        onSubmit={userAuth}
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
        <div className="flex flex-column ma2">
          <label htmlFor="confirm-password"> Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm Password"
            required
            id="confirm-password"
            className="h2 w5 bn login-details"
            onChange={(e) => (confirmPassword = e.target.value)}
          />
        </div>
        <button type="submit" className="btn bg-purple w5 h2 white mt3">
          Sign Up
        </button>
      </form>
      <button
        className="btn bg-white purple w5 h2 bn b shadow-4 pa1 mt4"
        onClick={() => changeForm("login")}
      >
        Existing User?Log In
      </button>
    </div>
  );
}

export default SignUpForm;
