import React from 'react';

import "./Styles/Play.css";
import Logo from "../images/PICKABLY.png"

class Play extends React.Component {
    render() {
        return (
            <div className="play__container">
                <div className="play__pin">
                <img src={Logo} alt="Logo Pickably" className="play__logo"/>
                <input type="text" placeholder="Game PIN" className="play__input"/>
                <button className="play__button">PLAY</button>
                </div>

                <div className="game__container">
                    or create a pickably game:
                    <button className="create__game">CREATE</button>
                </div>
            </div>
        )
    }
}

export default Play;