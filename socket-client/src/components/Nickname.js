import React from 'react';
import socketIOClient from "socket.io-client";
import './Styles/Nickname.css';

class Nickname extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // sending sockets
    send = (un) => {
        const socket = socketIOClient("localhost:5500");
        socket.emit('add player', un);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch("http://localhost:5500/room/zHjAhZp7/player/add", {
            method: 'POST',
            body: JSON.stringify({
                userName: data.get('userName')
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const un = data.get('userName');
        console.log(un);
        this.send(un);
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