import React from "react";
import "./style.css";
// import {gifka} from "/icons/200.gif"

const Winner = ({closeModal}) => {
    
    return (
        <div className="modal-bg">
            <div className="modal-container">
                <h1>You passed</h1>
                <img src="/icons/200.gif" alt="...loading" />
                <button onClick={() => closeModal(false)}>OK</button>
            </div>
        </div>
    )
}
export default Winner;