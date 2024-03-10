import { useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

const modalRoot:HTMLElement |null= document.getElementById("modal");
const body = document.getElementById("body");

function Modal({ children }:{
  children:ReactNode
}) {
  let ref = useRef<HTMLElement | null>(null);
  if (!ref.current) {
    let node = document.createElement("div");
    node.setAttribute("class", "w-100 h-100");
    ref.current = node;
  }

  useEffect(() => {
    if(modalRoot && ref.current && body){

      modalRoot.appendChild(ref.current);
      body.classList.add("overflow-hidden");
    }
    return () => {
      if(modalRoot && ref.current && body){
      modalRoot.removeChild(ref.current);
      body.classList.remove("overflow-hidden");
      }
    };
  }, []);

  return createPortal(
    <div className="flex justify-center items-center h-100">{children}</div>,
    ref.current
  );
}

export default Modal;
