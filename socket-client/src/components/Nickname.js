import React from 'react';
import socketIOClient from "socket.io-client";

import './Styles/Nickname.css';

const socket = socketIOClient("localhost:5500");

class Nickname extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const room = params.get('room');

        //console.log(room)

        socket.on('connect', function() {
            socket.emit('room', room);
            console.log('room >>>')
        });

        socket.on('message', function(data) {
            console.log('Incoming message:', data);
            console.log('<<< message')
         });
    }

    handleSubmit(event) {
        event.preventDefault();
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const room = params.get('room');

        const data = new FormData(event.target);

        fetch("http://localhost:5500/room/" + room + "/player/add", {
            method: 'POST',
            body: JSON.stringify({
                userName: data.get('userName')
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        socket.emit('newPlayer', room);
        window.location.href = '/loading';
    }

    render() {
        return (
            <div className="grid_container_light">
                <div className="nickname__content">
                    <div className="nickname__text">Before starting, <br/> identify yourself please.</div>

                    <form onSubmit={this.handleSubmit}>
                        <input placeholder="Nickname" className="nickname__input" id="userName" name="userName" type="text"/>
                        <button className="nickname__button">GO!</button>
                    </form>

                </div>
            </div>
        )
    }
}

export default Nickname;