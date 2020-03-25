import React from 'react';
import socketIOClient from "socket.io-client";

import './Styles/Home.css';
import Logo from "../images/PICKABLY.png";
import User from "../images/user.svg";
import Plus from "../images/plus.svg";
import Next from "../images/next.svg";
import Back from "../images/back.svg";
import Play from "../images/play.svg";
import Edit from "../images/edit.svg";
import Bin from "../images/bin.svg";

//const urlServer = "http://localhost:5500"
const urlServer = "https://pickably.herokuapp.com"

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
          endpoint: urlServer,
          loading: true,
          error: null,
          data: [ ]
        };
        this.socket = socketIOClient(this.state.endpoint);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({ loading: true, error: null });

        try {
            const response = await fetch(urlServer + "/questionary");
            const data = await response.json();
            console.log(data)
            this.setState({ loading: false, data: data });
        } catch (error) {
            this.setState({ loading: false, error: error });
        }
    }

    handleClickPlay = () => {
        fetch(process.env.URL + "/room/new/5e7a0a15a6056f337edb641a", {
            method: 'POST'
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const rId = data;
            this.socket.emit('hostCreateNewRoom', rId);
            console.log('Create new room: '+ rId);
            window.location.href='./pin?room=' + rId;
        });
    }

    handleClickDelete = () => {
        fetch(process.env.URL + "/questionary/del/5e7a0a15a6056f337edb641a", {
            method: 'DELETE'
        })
        .then((response) => {
            return response.json();
        })
        // .then((data) => {
        //     const rId = data;
        //     console.log('Create new room: '+ rId);
        // });
    }

    handleClickQuestion = () => {
        window.location.href='./new';
    }

    handleClickEdit = () => {
        window.location.href='./edit';
    }

    componentWillUnmount() {
        this.socket.off("hostCreateNewRoom");
    }

    render() {
        if (this.state.loading === true) {
            return 'loading...';
        }

        if (this.state.error) {
            return `Error: ${this.state.error.message}`;
        }
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
                        <div className="home__greeting">Hello</div>
                        <div className="home__secondary">Welcome back! We have new features for you.</div>
                        <button className="home__button" onClick={this.handleClickQuestion}>
                            <img src={Plus} alt="New quiz" className="home__plus"/>New
                        </button>
                    </div>
                    <div className="home__quiz">
                        <div className="home__content">
                            <div className="home__quiz__box">{this.state.data.map((desc) => {
                                return (
                                    <p>{desc.description}</p>
                                )
                            })}
                                <div className="home__social">
                                    <img onClick={this.handleClickPlay} src={Play} alt="Play button" className="button__home__play"/>
                                    <img onClick={this.handleClickEdit} src={Edit} alt="Edit button" className="button__home__edit"/>
                                    <img onClick={this.handleClickDelete} src={Bin} alt="Delete button" className="button__home__delete"/>
                                </div>
                            </div>
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