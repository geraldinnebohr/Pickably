import React from 'react';
import socketIOClient from "socket.io-client";
import './Styles/Results.css'

class Results extends React.Component {
    state = {
        loading: true,
        error: null,
        data: [ ],
        endpoint: "localhost:5500",
    };

    componentDidMount() {
        this.fetchData();

        const socket = socketIOClient(this.state.endpoint);
        // setInterval(this.send(), 1000)
        socket.on('poll vote', (u) => {
            this.fetchData();
        })
    }

    fetchData = async () => {
        this.setState({ loading: true, error: null });

        try {
            const response = await fetch("http://localhost:5500/poll/5e6467de44815d171a98e82c");
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
        console.log(this.state.data)

        return (
            <div className="grid_container_dark">
                <div className="container__results">
                    <div className={iconClass[i++]}></div>
                    {this.state.data.options.map((option) => {
                        return (
                            <li key={option._id} className="content__answer">{option.description}: {option.votes}</li>
                        )
                    })}
                    {console.log(this.state.data.options.description)}
                </div>
            </div>
        )
    }
}

export default Results;