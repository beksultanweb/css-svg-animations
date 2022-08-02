import React from "react";
import "./style.css";
import {levels} from "../../data/levels";
// import Giph1 from "../../../public/icons/giphy.gif";

const Modal = ({ poiskId, closeModal }) => {
    const level = levels.find((item) => item.id === poiskId);
    if(!level) return null;
    return (
        <div className="modal-bg">
            <div className="modal-container">
                <img src={level.src} alt="...loading" />
                <button onClick={() => closeModal(false)}>OK</button>
            </div>
        </div>
    )
}
export default Modal;