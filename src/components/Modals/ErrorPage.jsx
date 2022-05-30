import CloseIcon from "../../images/close.png";
import CorrectIcon from "../../images/warning.png";
function ErrorPage({ showModal }) {
  return (
    <div className="w-50 h-40 pa4 bg-white flex flex-column items-center">
      <button
        className="bn bg-inherit ma1 close-btn w3 self-end"
        onClick={showModal}
        onBlur={showModal}
      >
        <img src={CloseIcon} alt="close button" />
      </button>
      <p className="f3">Error Encountered. Please try again later</p>
      <img
        src={CorrectIcon}
        alt="Email successfully sent"
        className="w-10 h-10"
      />
    </div>
  );
}

export default ErrorPage;
