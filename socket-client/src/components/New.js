import React from "react";

import './Styles/New.css';
import Logo from "../images/PICKABLY.png";
import User from "../images/user.svg";
import Plus from "../images/plus.svg";

class New extends React.Component {
    render() {
        return (
            <div className="grid_container_dark">
                <div className="new__container">
                    <div className="home__header">
                        <img src={Logo} alt="Logo Pickably" className="home__logo"/>
                        <div className="home__navbar">
                            <img src={User} alt="" className="home__user"/>
                        </div>
                    </div>
                    <div>
                        <input type="text" className="new__question" placeholder="Write your question here"/>
                        <button className="new__button">
                            <img src={Plus} alt="New quiz" className="new__plus"/>Question
                        </button>
                    </div>
                    <div className="new__box">
                        <div className="new__box__answers">
                            <div></div>
                            <div className="content__circle"></div>
                            <div className="content__triangle"></div>
                            <div className="content__square"></div>
                            <div className="content__ex"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default New;