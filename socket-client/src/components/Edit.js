import React from "react";

import './Styles/New.css';
import Logo from "../images/PICKABLY.png";
import User from "../images/user.svg";
import Plus from "../images/plusViolet.svg";
import Circle from '../images/circle.svg';
import Square from '../images/square.svg';
import Triangle from '../images/triangle.svg';
import Ex from '../images/ex.svg';

class Edit extends React.Component {
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
                            <div className="content__circle">
                                <img src={Circle} alt="" className="new__icons"/>
                            </div>
                            <div className="content__triangle">
                            <img src={Triangle} alt="" className="new__icons"/>
                            </div>
                            <div className="content__square">
                            <img src={Square} alt="" className="new__icons"/>
                            </div>
                            <div className="content__ex">
                            <img src={Ex} alt=""  className="new__icons"/>
                            </div>
                            <div></div>
                            <input type="text" placeholder="First answer" className="new__answer1"/>
                            <input type="text" placeholder="First answer" className="new__answer2"/>
                            <input type="text" placeholder="First answer" className="new__answer3"/>
                            <input type="text" placeholder="First answer" className="new__answer4"/>
                            <div className="new__true">True</div>
                            <div className="new__check1"><input type="checkbox"/></div>
                            <div className="new__check2"><input type="checkbox"/></div>
                            <div className="new__check3"><input type="checkbox"/></div>
                            <div className="new__check4"><input type="checkbox"/></div>
                            <div className="new__false">False</div>
                            <div className="new__false1"><input type="checkbox"/></div>
                            <div className="new__false2"><input type="checkbox"/></div>
                            <div className="new__false3"><input type="checkbox"/></div>
                            <div className="new__false4"><input type="checkbox"/></div>
                        </div>
                        <button className="new__box__button">Save</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Edit;