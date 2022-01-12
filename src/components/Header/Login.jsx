function Login({ userClick }) {
  return (
    <button
      className="btn login-btn bg-white black pa2 b w4"
      onClick={userClick}
    >
      Login
    </button>
  );
}

export default Login;
