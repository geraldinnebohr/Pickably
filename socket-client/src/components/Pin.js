import React from 'react';
import socketIOClient from "socket.io-client";

import './Styles/Pin.css';

//const urlServer = "http://localhost:5500"
const urlServer = "https://pickably.herokuapp.com"

const socket = socketIOClient(urlServer);

class Pin extends React.Component {
    state = {
        loading: true,
        error: null,
        data: [ ],
        room: null
    };

    componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const room = params.get('room');

        //console.log(room)

        socket.on('connect', function() {
            socket.emit('room', room);
            console.log('pin/room >>>');
        });

        this.fetchData()
    }

    componentDidUpdate() {
        const comp = this;

        socket.on('updatePlayersList', function(room) {
            console.log('<<< pin/updatePlayersList');
            comp.fetchData();
        });

    }

    fetchData = async () => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const room = params.get('room');

        this.setState({ loading: true, error: null });

        try {
            const response = await fetch(urlServer + "/room/" + room);
            const data = await response.json();
            this.setState({ loading: false, data: data });
            console.log(data)
        } catch (error) {
            this.setState({ loading: false, error: error });
        }
    }

    handleClick = () => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const room = params.get('room');

        window.location.href='./question?room=' + room + '&index=0';
    }

    render() {
        if (this.state.loading === true) {            
            return (
                'loading'
            )
        }

        if (this.state.error) {
            return `Error: ${this.state.error.message}`;
        }
        
        return (
            <div className="pin__container">
                <div className="pin__content">
                    <p className="join__pin">Join with this pin: </p>{this.state.data._id}
                    <div className="pin__users">
                        {this.state.data.players.map((user) => {
                            return (
                                <li key={user._id}>{user.userName}</li>
                            )
                        })}
                    </div>
                    <button onClick={this.handleClick} className="button__pin">START</button>
                </div>
            </div>
        )
    }
}

export default Pin;