import React from 'react';

import './Styles/Home.css';
import Logo from "../images/PICKABLY.png";
import User from "../images/user.svg";
import Plus from "../images/plus.svg";
import Next from "../images/next.svg";
import Back from "../images/back.svg";


class Home extends React.Component {
    render() {
        return (
            <div className="grid_container_dark">
                <div className="home__container">
                    <div className="home__header">
                        <img src={Logo} alt="Logo Pickably" className="home__logo"/>
                        <div className="home__navbar">
                            <img src={User} alt="" className="home__user"/>
                        </div>
                    </div>
                    <div className="home__text">
                        <div className="home__greeting">Hello Paul</div>
                        <div className="home__secondary">Welcome back! We have new features for you.</div>
                        <button className="home__button">
                            <img src={Plus} alt="New quiz" className="home__plus"/>New
                        </button>
                    </div>
                    <div className="home__quiz">
                        <div className="home__content">
                            <div className="home__quiz__title">quizzzz</div>
                        </div>
                        <div className="arrow__left">
                            <img src={Back} alt="" className="img__home"/>
                        </div>
                        <div className="arrow__right">
                            <img src={Next} alt="" className="img__home"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;