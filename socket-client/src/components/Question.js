import React from 'react';
import socketIOClient from "socket.io-client";

import './Styles/Question.css';
import Gif from '../images/loader.gif';

const socket = socketIOClient("localhost:5500");

class Question extends React.Component {
    state = {
        loading: true,
        error: null,
        index: null,
        room: null,
        data: [ ],
        redirect: false
    };

    // sending sockets
    send = (room) => {
        socket.emit('playerVotes', { room: room, index: this.state.index });
        console.log('question/playerVotes >>>');
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
            window.location.href='./answers?room=' + this.state.room + '&index=' + this.state.index;
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
        
        return (
            <div className="grid_container_dark">
                <div className="child__content__answer">
                    <div className="counter__left">
                        <div className="counter__circle">
                            {/* <span className="timer">
                                5
                            </span> */}
                            <img src={Gif} alt="loading"/>
                        </div>
                    </div>
                    <div className="question__right">{this.state.data.description}</div>
                </div>
            </div>
        )
    }
}


export default Question;