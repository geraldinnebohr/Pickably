import React from 'react';
import socketIOClient from "socket.io-client";

import './Styles/Results.css'
import Circle from '../images/circle.svg';
import Square from '../images/square.svg';
import Triangle from '../images/triangle.svg';
import Ex from '../images/ex.svg';

class Results extends React.Component {
    state = {
        loading: true,
        error: null,
        index: null,
        room: null,
        data: [ ],
        endpoint: process.env.URL,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const i = params.get('index');
        const room = params.get('room');

        this.setState({ loading: true, error: null, index: i, room: room });

        try {
            const response = await fetch(process.env.URL + "/room/" + room + "/question/" + i);
            const data = await response.json();
            this.setState({ loading: false, data: data });
        } catch (error) {
            this.setState({ loading: false, error: error });
        }
    }

    handleClick = () => {
        const iNext = 1 + +this.state.index;
        window.location.href='./question?room=' + this.state.room + '&index=' + iNext;
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

        let j = 0
        const icons = [Circle, Triangle, Square, Ex]

        return (
             <div className="grid_container_dark">
                 <div className="child__content__results">
                    {/* <div className="content__righttttt"> */}
                        <div className="content__container__results">
                            <div className="title__results">Results:</div>
                            {this.state.data.answers.map((answer) => {
                                return (
                                    <>
                                    <div className={iconClass[i++]}>
                                    <img src={icons[j++]} alt="icon" className="res__icons"/>
                                    </div>
                                <li key={answer._id} className="content__answer"><div className="ans__description">{answer.description}:</div> {answer.votes} votes</li>
                                    </>
                                )
                            })}
                    </div>
                    <button onClick={this.handleClick} className="button__results">NEXT</button>
                </div>
            </div>
        )
    }
}

export default Results;