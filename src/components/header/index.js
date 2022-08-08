import React from "react";
import "./style.css";
import {ReactComponent as Logo} from "./logo.svg"
const Header = () => {
    return (
        <div className="header-wrapper">
            <div className="header-row">
                <div className="logoTxt"><Logo className="logo"/><div className="txt">animations</div></div>
                <div className="buttons">
                    <a href={"mailto: beksultan.sagnaev@gmail.com"}>Write feedback</a>
                </div>
                
            </div>
            
        </div>
    )
}
export default Header;