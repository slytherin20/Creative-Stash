import LoginImg from "../../images/login.jpg";
function LoginForm() {
  return (
    <div className="w-100 aspect-ratio--object h-100 bg-black-80 overflow-y-hidden flex justify-center items-center">
      <div className="login-popup w-60 h-75 bg-white">
        <img className="login-img w-50" alt="login" src={LoginImg} />
        <div className="login-form w-50"></div>
      </div>
    </div>
  );
}

export default LoginForm;
