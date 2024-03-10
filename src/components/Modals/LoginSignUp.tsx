import LoginImg from "../../images/shopping.svg";
import CloseIcon from "../../images/close.png";
import DeviceContext from "../DeviceContext";
import { useContext } from "react";

function LoginSignUp({ title, text, form, showModal }:{
  title:string,
  text:string,
  form:JSX.Element,
  showModal:()=>void
}) {
  const { isMobile, isTablet } = useContext(DeviceContext);
  return (
    <div
      className={`login-popup ${
        isMobile || isTablet ? "w-100 h-100" : "w-50 h-75"
      } bg-white flex`}
    >
      {!isMobile && (
        <div className="login-banner w-40 bg-purple h-100 pa4">
          <div className="white h-50 w-80">
            <p className="f2 b ma0">{title}</p>
            <p className="f4 white-80">{text}</p>
          </div>
          <img className="login-img h-50" alt="login" src={LoginImg} />
        </div>
      )}
      <div
        className={`login-form ${
          isMobile ? "w-100 flex flex-column" : "w-60 flex flex-column"
        } `}
      >
        {isMobile && (
          <div className="login-banner w-100 bg-purple h-30 pa4">
            <button
              className="bg-transparent bn white relative close-pos-login f3"
              onClick={showModal}
              onBlur={showModal}
            >
              X
            </button>
            <p className="f2 b ma0 white">{title}</p>
            <p className="f4 white">{text}</p>
          </div>
        )}
        {!isMobile && (
          <button
            className="bn bg-inherit ma1 close-btn self-end"
            onClick={showModal}
            onBlur={showModal}
          >
            <img src={CloseIcon} alt="close button" />
          </button>
        )}
        {form}
      </div>
    </div>
  );
}

export default LoginSignUp;
