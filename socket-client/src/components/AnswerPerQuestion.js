import React from 'react';
import socketIOClient from "socket.io-client";

import './Styles/AnswerPerQuestion.css';
import Circle from '../images/circle.svg';
import Square from '../images/square.svg';
import Triangle from '../images/triangle.svg';
import Ex from '../images/ex.svg';

const socket = socketIOClient("localhost:5500");

class AnswerPerQuestion extends React.Component {
    state = {
        loading: true,
        error: null,
        index: null,
        room: null,
        data: [ ],
    };

    // sending sockets
    send = (room) => {
        socket.emit('timeCompleted', { room: room, index: this.state.index });
        console.log('answer/timeCompleted >>>');
    }

    componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const room = params.get('room');

        //console.log(room)

        socket.on('connect', function() {
            socket.emit('room', room);
            console.log('question/room >>>');
        });

        this.fetchData();
        setTimeout(() => {
            this.send(room);
            window.location.href='./results?room=' + this.state.room + '&index=' + this.state.index;
        }, 5000)
    }

    fetchData = async () => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const i = params.get('index');
        const room = params.get('room');

        this.setState({ loading: true, error: null, index: i, room: room });

        try {
            const response = await fetch("http://localhost:5500/room/" + room + "/question/" + i);
            const data = await response.json();
            this.setState({ loading: false, data: data });
        } catch (error) {
            this.setState({ loading: false, error: error });
        }
    }

    render() {
        if (this.state.loading === true) {
            return 'loading...';
        }

        if (this.state.error) {
            return `Error: ${this.state.error.message}`;
        }

        let i = 0
        const iconClass = ["content__circle", "content__triangle", "content__square", "content__ex"]
        
        let j = 0
        const icons = [Circle, Triangle, Square, Ex]
        
        return (
            <div className="grid__container">
                <div className="child__content__answer">
                    <div className="content__left">
                            <p>{this.state.data.description}</p>
                    </div>
                    <div className="content__right" >
                        <div className="content__container">
                            {this.state.data.answers.map((answer) => {
                                return (
                                    <>
                                    <div className={iconClass[i++]}>
                                        <img src={icons[j++]} alt="icon" className="ans__icons"/>
                                    </div>
                                    <li key={answer._id} className="content__answer">{answer.description}
                                    </li>
                                    </>
                                )
                                })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AnswerPerQuestion;