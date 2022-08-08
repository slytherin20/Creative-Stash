import { useState } from "react";
import Modal from "../Modals/Modal.jsx";
import LoginSignUp from "../Modals/LoginSignUp.jsx";
import Form from "../Login/Form.jsx";
import SignUpForm from "../SignUp/SignUp.jsx";
import VerifyEmailScreen from "../Modals/VerifyEmailScreen.jsx";
import Loading from "../Modals/Loading.jsx";

function LoginIcon({ color, btnText }) {
  const [showPopup, setShowPopup] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [modalContent, setModalContent] = useState("LoginSignUp");
  function toggleModal() {
    setModalContent("LoginSignUp");
    setShowPopup(!showPopup);
  }

  function changeModalType(val) {
    setModalType(val);
  }
  function changeModalContent(val) {
    setModalContent(val);
  }
  let [title, text, form] =
    modalType === "login"
      ? [
          "Login",
          "Login to show orders and buy items.",
          <Form
            key={modalType}
            changeForm={changeModalType}
            closePopup={toggleModal}
            changeModalContent={changeModalContent}
          />,
        ]
      : [
          "SignUp",
          "Create account to shop your favourite items!",
          <SignUpForm
            key={modalType}
            changeForm={changeModalType}
            changeModalContent={changeModalContent}
          />,
        ];

  return (
    <>
      <button className={`btn  bg-purple white ${color}`} onClick={toggleModal}>
        {btnText ? btnText : "Login"}
      </button>
      {showPopup ? (
        modalContent === "LoginSignUp" ? (
          <Modal>
            <LoginSignUp
              title={title}
              text={text}
              form={form}
              showModal={toggleModal}
              changeForm={setModalType}
            />
          </Modal>
        ) : modalContent === "loading" ? (
          <Modal>
            <Loading />
          </Modal>
        ) : (
          <Modal>
            <VerifyEmailScreen showModal={toggleModal} />
          </Modal>
        )
      ) : null}
    </>
  );
}

export default LoginIcon;
