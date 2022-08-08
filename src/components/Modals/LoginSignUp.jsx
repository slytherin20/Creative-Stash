import LoginImg from "../../images/shopping.svg";
import CloseIcon from "../../images/close.png";

function LoginSignUp({ title, text, form, showModal }) {
  return (
    <div className="login-popup w-50 h-75 bg-white flex">
      <div className="login-banner w-40 bg-purple h-100 pa4">
        <div className="white h-50 w-80">
          <p className="f2 b ma0">{title}</p>
          <p className="f4 white-80">{text}</p>
        </div>
        <img className="login-img h-50" alt="login" src={LoginImg} />
      </div>
      <div className="login-form w-60 flex flex-column ">
        <button
          className="bn bg-inherit ma1 close-btn self-end"
          onClick={showModal}
          onBlur={showModal}
        >
          <img src={CloseIcon} alt="close button" />
        </button>
        {form}
      </div>
    </div>
  );
}

export default LoginSignUp;
