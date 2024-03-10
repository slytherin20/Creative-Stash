import { useState } from "react";
import Modal from "../Modals/Modal";
import LoginSignUp from "../Modals/LoginSignUp";
import Form from "../Login/Form";
import SignUpForm from "../SignUp/SignUp";
import VerifyEmailScreen from "../Modals/VerifyEmailScreen";
import Loading from "../Modals/Loading";

function LoginIcon({ color, btnText }:{color:string,btnText:string}) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("login");
  const [modalContent, setModalContent] = useState<string>("LoginSignUp");
  function toggleModal() {
    setModalContent("LoginSignUp");
    setShowPopup(!showPopup);
  }

  function changeModalType(val:string) {
    setModalType(val);
  }
  function changeModalContent(val:string) {
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
