import { Link } from "react-router-dom";

function Login() {
  return (
    <Link to="/login">
      <button className="btn login-btn bg-white black pa2 b w4">Login</button>
    </Link>
  );
}

export default Login;
