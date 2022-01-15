import { Link } from "react-router-dom";
function SignUpForm() {
  return (
    <div className="h-75 flex flex-column justify-center items-center">
      <form className="ma2 flex flex-column items-center justify-between h-90">
        <div className="flex flex-column ma2">
          <label htmlFor="email-id">E-mail:</label>
          <input
            type="email"
            placeholder="Enter E-mail Id"
            required
            id="email-id"
            className="bn h2 w5 login-details"
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
          />
        </div>
        <button type="submit" className="btn bg-purple w5 h2 white mt3">
          Sign Up
        </button>
      </form>
      <Link to="/login">
        <button className="btn bg-white purple w5 h2 bn b shadow-4 pa1 mt4">
          Existing User?Log In
        </button>
      </Link>
    </div>
  );
}

export default SignUpForm;
