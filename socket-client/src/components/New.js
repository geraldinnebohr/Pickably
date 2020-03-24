import React from "react";

import './Styles/New.css';
import Logo from "../images/PICKABLY.png";
import User from "../images/user.svg";
import Plus from "../images/plusViolet.svg";
import Circle from '../images/circle.svg';
import Square from '../images/square.svg';
import Triangle from '../images/triangle.svg';
import Ex from '../images/ex.svg';

class New extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch(process.env.URL + "/questionary/add", {
            method: 'POST',
            body: JSON.stringify({
                description: data.get('description'),
                questions: [
                    {description: data.get('description')},
                    {answers: [
                        {value: data.get('value')},
                        {description: data.get('description')}
                    ]}
                ]}
            ),
            headers:{
                'Content-Type': 'application/json'
            }            
        });
        window.location.href = './new';
    }

    handleClick() {
        window.location.href='./new';
    }

    handleCheck() {
        ("input[type=checkbox]").change(function(){
            if ( this.is(":checked") ){
                this.id = "true";
            } else {
                this.id = "false";
            }
        });
    }

    render() {
        return (
            <div className="grid_container_dark">
                <form className="new__container" onSubmit={this.handleSubmit}>
                    <div className="home__header">
                        <img src={Logo} alt="Logo Pickably" className="home__logo"/>
                        <div className="home__navbar">
                            <img src={User} alt="" className="home__user"/>
                        </div>
                    </div>
                    <div>
                        <input type="text" className="new__question" placeholder="Write your questionary name here" id="description" name="description"/>
                        <button className="new__button" onClick={this.handleClick}>
                            <img src={Plus} alt="New quiz" className="new__plus"/>Question
                        </button>
                    </div>
                    <div>
                    <input type="text" className="new__questionary" placeholder="Write your question here" id="description" name="description"/>
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
                            <input type="text" placeholder="First answer" className="new__answer1" id="answer_description" name="description"/>
                            <input type="text" placeholder="Second answer" className="new__answer2" id="answer_description" name="description"/>
                            <input type="text" placeholder="Third answer" className="new__answer3" id="answer_description" name="description"/>
                            <input type="text" placeholder="Fourth answer" className="new__answer4" id="answer_description" name="description"/>
                            <div className="new__true">True</div>
                            <div className="new__check1"><input type="checkbox" id="true" name="value"/></div>
                            <div className="new__check2"><input type="checkbox"id="true" name="value"/></div>
                            <div className="new__check3"><input type="checkbox"id="true" name="value"/></div>
                            <div className="new__check4"><input type="checkbox"id="true" name="value"/></div>
                            <div className="new__false">False</div>
                            <div className="new__false1"><input type="checkbox"/></div>
                            <div className="new__false2"><input type="checkbox"/></div>
                            <div className="new__false3"><input type="checkbox"/></div>
                            <div className="new__false4"><input type="checkbox"/></div>
                        </div>
                        <button className="new__box__button">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default New;