import { Link } from "react-router-dom";

function Form() {
  return (
    <div className="h-75 flex flex-column justify-center align-center">
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
        <button type="submit" className="btn bg-purple w5 h2 white">
          Login
        </button>
      </form>
      <Link to="/signup" className="no-underline">
        <p className="tc mt4">Not Registered? Sign Up!</p>
      </Link>
    </div>
  );
}

export default Form;
