import React from 'react';
import socketIOClient from "socket.io-client";
import './Styles/AnswerPerQuestion.css';

class AnswerPerQuestion extends React.Component {
    state = {
        loading: true,
        error: null,
        index: null,
        data: [ ],
    };

    // sending sockets
    send = (i) => {
        const socket = socketIOClient("localhost:5500");
        socket.emit('question results', i);
    }

    componentDidMount() {
        this.fetchData();
        setTimeout(() => {
            this.send(this.state.index);
            window.location.href='./results?index=' + this.state.index;
        }, 5000)
    }

    fetchData = async () => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const i = params.get('index');
        this.setState({ loading: true, error: null, index: i });

        try {
            const response = await fetch("http://localhost:5500/questionary/5e44e0a71c9d440000177bf7/question/" + i);                const data = await response.json();
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
        
        
        return (
            <div className="grid_container_dark">
                <div className="child__content__answer">
                    <div className="content__left">
                            <p>{this.state.data.description}</p>
                    </div>
                    <div className="content__right" >
                        <div className="content__container">
                            {/* <div className={iconClass[i++]}></div> */}
                            {this.state.data.answers.map((answer) => {
                                return (
                                    <>
                                    <div className={iconClass[i++]}></div>
                                    <li key={answer._id} className="content__answer">{answer.description}
                                    </li>
                                    </>
                                )
                                })}
                            })}
                        </div>
                    </div>
                </div>
                {/* <button onClick={this.handleClick}>next</button> */}
            </div>
        )
    }
}

export default AnswerPerQuestion;