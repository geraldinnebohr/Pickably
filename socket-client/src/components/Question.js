import React from 'react';
import socketIOClient from "socket.io-client";

class Question extends React.Component {
    state = {
        loading: true,
        error: null,
        index: 0,
        data: [ ],
        redirect: false
    };

    // sending sockets
    send = (i) => {
        const socket = socketIOClient("localhost:5500");
        socket.emit('please answer', i);
    }

    componentDidMount() {
        this.fetchData();
        this.id = setTimeout(() => {
            this.send(this.state.index);
            window.location.href='./answers';
        }, 10000)
    }

    componentWillUnmount() {
        clearTimeout(this.id)
    }    

    fetchData = async () => {
            this.setState({ loading: true, error: null });

            try {
                const response = await fetch("http://localhost:5500/questionary/5e44e0a71c9d440000177bf7/question/" + this.state.index);
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
        
        
        return (
            <div>
                <div>
                    <div>
                        <p>{this.state.data.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}


export default Question;