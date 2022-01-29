import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");
const body = document.getElementById("body");

function Modal({ children }) {
  let ref = useRef(null);
  if (!ref.current) {
    let node = document.createElement("div");
    node.setAttribute("class", "w-100 h-100");
    ref.current = node;
  }

  useEffect(() => {
    modalRoot.appendChild(ref.current);
    body.classList.add("overflow-hidden");
    return () => {
      modalRoot.removeChild(ref.current);
      body.classList.remove("overflow-hidden");
    };
  }, []);

  return createPortal(
    <div className="flex justify-center items-center h-100">{children}</div>,
    ref.current
  );
}

export default Modal;
