import React from "react";
import "./style.css";
// import Giph1 from "../../../public/icons/giphy.gif";

const Modal = ({ closeModal }) => {
    
    return (
        <div className="modal-bg">
            <div className="modal-container">
                <img alt="...loading" />
                <button onClick={() => closeModal(false)}>OK</button>
            </div>
        </div>
    )
}
export default Modal;