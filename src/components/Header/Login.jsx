import { useState } from "react";
import Modal from "../Modals/Modal.jsx";
import LoginSignUp from "../Modals/LoginSignUp.jsx";
import Form from "../Login/Form.jsx";
import SignUpForm from "../SignUp/SignUp.jsx";

function Login({ color }) {
  const [showPopup, setShowPopup] = useState(false);
  const [modalType, setModalType] = useState("login");
  function toggleModal() {
    setShowPopup(!showPopup);
  }

  function changeModalType(val) {
    setModalType(val);
  }
  let [title, text, form] =
    modalType === "login"
      ? [
          "Login",
          "Login to show orders and buy items.",
          <Form key={modalType} changeForm={changeModalType} />,
        ]
      : [
          "SignUp",
          "Create account to shop your favourite items!",
          <SignUpForm key={modalType} changeForm={changeModalType} />,
        ];

  return (
    <>
      <button
        className={`btn login-btn bg-white black pa2 b w4 ${color}`}
        onClick={toggleModal}
      >
        Login
      </button>
      {showPopup ? (
        <Modal>
          <LoginSignUp
            title={title}
            text={text}
            form={form}
            showModal={toggleModal}
            changeForm={setModalType}
          />
        </Modal>
      ) : null}
    </>
  );
}

export default Login;
