import React from 'react';
import socketIOClient from "socket.io-client";
import BackgroundDark from './BackgroundDark';

class Loading extends React.Component {
    render() {
        const socket = socketIOClient("localhost:5500");
        socket.once('time to vote', (i) => {
            window.location.href='./game?index=' + i;
        })

        return (
            <div className="grid_container_dark">
                <div className="child__content__answer">
                    prueba
                </div>
            </div>
        )
    }
}

export default Loading;