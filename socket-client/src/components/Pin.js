import React from 'react';
import socketIOClient from "socket.io-client";

import './Styles/Pin.css';

class Pin extends React.Component {
    state = {
        loading: true,
        error: null,
        data: [ ]
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({ loading: true, error: null });

        try {
            const response = await fetch("http://localhost:5500/room/YQJvMjl0");
            const data = await response.json();
            this.setState({ loading: false, data: data });
        } catch (error) {
            this.setState({ loading: false, error: error });
        }
    }

    handleClick = () => {
        window.location.href='./question?index=0';
    }

    render() {

        const socket = socketIOClient("localhost:5500");
        socket.once('add player', (un) => {
            this.fetchData();
        })

        if (this.state.loading === true) {
            return 'loading...';
        }

        if (this.state.error) {
            return `Error: ${this.state.error.message}`;
        }
console.log(this.state.data)
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