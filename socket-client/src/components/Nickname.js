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
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const room = params.get('room');

        event.preventDefault();
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
        const pn = data.get('userName');
        // console.log(pn);
        this.send({playerName: pn, roomId: room});
        window.location.href='./loading';
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