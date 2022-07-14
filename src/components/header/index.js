import React from "react";
import "./style.css";
const Header = () => {
    return (
        <div className="header-wrapper">
            <div className="header-row">
                <div className="logo">Animate(CSS+SVG)</div>
                <div className="buttons">
                    <a href={"mailto: beksultan.sagnaev@gmail.com"}>Write feedback</a>
                    <div className="logbtn">Log in</div>
                    <div className="logbtn">Sign up</div>
                </div>
                
            </div>
            
        </div>
    )
}
export default Header;