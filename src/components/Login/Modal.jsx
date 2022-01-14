import LoginImg from "../../images/shopping.svg";
import CloseIcon from "../../images/close.png";
import { useNavigate } from "react-router-dom";
import Form from "./Form.jsx";

function LoginModal() {
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
          <Form />
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
