import LoginImg from "../../images/shopping.svg";
import CloseIcon from "../../images/close.png";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  return (
    <div className="w-100 aspect-ratio--object h-100 bg-black-80  flex justify-center items-center">
      <div className="login-popup w-50 h-75 bg-white flex">
        <div className="login-banner w-40 bg-purple h-100 pa4">
          <div className="white h-50 w-80">
            <p className="f2 b ma0">Login</p>
            <p className="f4 white-80">Login to show orders and buy items.</p>
          </div>
          <img className="login-img h-50" alt="login" src={LoginImg} />
        </div>
        <div className="login-form w-60 flex flex-column justify-between">
          <button
            className="bn bg-inherit ma1 close-btn w3 self-end"
            onClick={() => navigate(-1)}
            onBlur={() => navigate(-1)}
          >
            <img src={CloseIcon} alt="close button" />
          </button>
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
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
