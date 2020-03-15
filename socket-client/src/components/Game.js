import React from 'react';
import socketIOClient from "socket.io-client";

import './Styles/Game.css';
import Circle from '../images/circle.svg';
import Square from '../images/square.svg';
import Triangle from '../images/triangle.svg';
import Ex from '../images/ex.svg';

class Game extends React.Component {
    state = {
        loading: true,
        error: null,
        endpoint: "localhost:5500",
        updated: null
    };

    componentDidMount() {
        this.fetchData();
    };

    fetchData = async () => {
            this.setState({ loading: true, error: null });
    }

    handleClickCircle = e => {
        e.preventDefault();
        this.setState({ loading: true, error: null });
    
            try {
                fetch("http://localhost:5500/poll/5e6467de44815d171a98e82c/option/update/5e6468af44815d171a98e82e", {
                    method: 'PUT',
                    body: JSON.stringify(this.state.data),
                    headers:{
                        'Content-Type': 'application/json'
                      }
                }).then(update => update.json());
                this.setState({ loading: false, updated: true });
                console.log("done!");
                window.location.href='./loading';
            } catch (error) {
                console.log(error);
                this.setState({ loading: false, error: error });
            }
    };

    handleClickTriangle = e => {
        e.preventDefault();
        this.setState({ loading: true, error: null });
    
            try {
                fetch("http://localhost:5500/poll/5e6467de44815d171a98e82c/option/update/5e64688f44815d171a98e82d", {
                    method: 'PUT',
                    body: JSON.stringify(this.state.data),
                    headers:{
                        'Content-Type': 'application/json'
                      }
                }).then(update => update.json());
                this.setState({ loading: false, updated: true });
                console.log("done!");
                window.location.href='./loading';
            } catch (error) {
                console.log(error);
                this.setState({ loading: false, error: error });
            }
    };

    handleClickSquare = e => {
        e.preventDefault();
        this.setState({ loading: true, error: null });
    
            try {
                fetch("http://localhost:5500/poll/5e6467de44815d171a98e82c/option/update/5e64690944815d171a98e82f", {
                    method: 'PUT',
                    body: JSON.stringify(this.state.data),
                    headers:{
                        'Content-Type': 'application/json'
                      }
                }).then(update => update.json());
                this.setState({ loading: false, updated: true });
                console.log("done!");
                window.location.href='./loading';
            } catch (error) {
                console.log(error);
                this.setState({ loading: false, error: error });
            }
    };

    handleClickEx = e => {
        e.preventDefault();
        this.setState({ loading: true, error: null });
    
            try {
                fetch("http://localhost:5500/poll/5e6467de44815d171a98e82c/option/update/5e64690f44815d171a98e830", {
                    method: 'PUT',
                    body: JSON.stringify(this.state.data),
                    headers:{
                        'Content-Type': 'application/json'
                      }
                }).then(update => update.json());
                this.setState({ loading: false, updated: true });
                console.log("done!");
                window.location.href='./loading';
            } catch (error) {
                console.log(error);
                this.setState({ loading: false, error: error });
            }
    };

    render() {
        const socket = socketIOClient("localhost:5500");
        socket.once('question results', (i) => {
            window.location.href='./loading';
        })

        return (
            <div className="grid_container_light">
                <div className="child__content__game">
                    <div className="content__squares">
                        <button onClick={this.handleClickCircle} className="squares__circle">
                            <img src={Circle} alt="circle" className="icons"/>
                        </button>
                        <button onClick={this.handleClickTriangle} className="squares__triangle">
                        <img src={Triangle} alt="triangle" className="icons"/>
                        </button>
                        <button onClick={this.handleClickSquare} className="squares__square">
                        <img src={Square} alt="square" className="icons"/>
                        </button>
                        <button onClick={this.handleClickEx} className="squares__ex">
                        <img src={Ex} alt="ex" className="icons"/>
                        </button>
                    </div>
                    <div className="content__score"></div>
                </div>
            </div>
        )
    }
}

export default Game;