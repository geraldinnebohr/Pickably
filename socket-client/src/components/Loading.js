import React from 'react';
import socketIOClient from "socket.io-client";

import './Styles/Loading.css'
import Gif from '../images/loader.gif';

const socket = socketIOClient("localhost:5500");

class Loading extends React.Component {
    componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const room = params.get('room');

        socket.on('connect', function() {
            socket.emit('room', room);
            console.log('loading/room >>>');
        });

        socket.on('showButtons', (data) => {
            window.location.href='./game?index=' + data.index + '&room=' + data.room;
        });

        socket.on('finishGame', (room) => {
            window.location.href='./gameover';
        });
    }

    render() {
        return (
            <div className="grid_container_dark">
                <div className="loading__content">
                    {/* <div className="loading__counter"> */}
                        <img src={Gif} alt="loading"/>
                    {/* </div> */}
                </div>
            </div>
        )
    }
}

export default Loading;