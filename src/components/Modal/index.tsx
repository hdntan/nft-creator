import * as React from "react";
import ReactDOM from "react-dom";

export interface IModalProps {
  isShowing: boolean;
  hide: () => void;
  children: React.ReactNode;
}
const Modal = ({ isShowing, hide, children }: IModalProps) =>
  isShowing ? (
    <React.Fragment>
      <div className="modal-overlay" />
      <div
        className="modal-wrapper"
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal">{children}</div>
      </div>
    </React.Fragment>
  ) : null;

export default Modal;
