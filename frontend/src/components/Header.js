import "./header.css"
import "./global.css"
import React from "react";

const Header = () => {

    return(
        <header>
            <div id="headerContent">
                <span className="dot" id="pinkDot"></span>
                <div id="headerText"> MOCHI </div>
                <span className="dot" id="greenDot"></span>
            </div>
            <p id="subHeader">JAPANESE GRAMMAR QUESTION GENERATOR</p>
        </header>
    )
}

export default Header