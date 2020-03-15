import React from 'react';
import socketIOClient from "socket.io-client";

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
            <div>
            {this.state.data._id}
                <div>
                    {this.state.data.players.map((user) => {
                        return (
                            <li key={user._id}>{user.userName}</li>
                        )
                    })}
                </div>
                <button onClick={this.handleClick}>START</button>
            </div>
        )
    }
}

export default Pin;