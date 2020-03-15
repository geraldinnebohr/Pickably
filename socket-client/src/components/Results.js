import React from 'react';
import socketIOClient from "socket.io-client";
import './Styles/Results.css'

class Results extends React.Component {
    state = {
        loading: true,
        error: null,
        index: null,
        data: [ ],
        endpoint: "localhost:5500",
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const i = params.get('index');
        this.setState({ loading: true, error: null, index: i });

        try {
            const response = await fetch("http://localhost:5500/room/YQJvMjl0/question/" + i);
            const data = await response.json();
            this.setState({ loading: false, data: data });
        } catch (error) {
            this.setState({ loading: false, error: error });
        }
    }

    handleClick = () => {
        const iNext = 1 + +this.state.index;
        window.location.href='./question?index=' + iNext;
    }

    render() {
        const socket = socketIOClient(this.state.endpoint);
        // setInterval(this.send(), 1000)
        socket.on('poll vote', (u) => {
            this.fetchData();
        })

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
                    {this.state.data.answers.map((answer) => {
                        return (
                            <li key={answer._id} className="content__answer">{answer.description}: {answer.votes}</li>
                        )
                    })}
                </div>
                 <button onClick={this.handleClick}>NEXT</button>
            </div>
        )
    }
}

export default Results;