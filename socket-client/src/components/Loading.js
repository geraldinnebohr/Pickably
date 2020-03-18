import React from 'react';
import socketIOClient from "socket.io-client";

import './Styles/Loading.css'
import Gif from '../images/loader.gif';

const socket = socketIOClient("localhost:5500");

class Loading extends React.Component {
    componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const pRoom = params.get('room');
        const pName = params.get('name');

        socket.on('connect', function() {
            socket.emit('room', pRoom);
            console.log('loading/room >>>');
        });

        socket.on('showButtons', (data) => {
            window.location.href='./game?index=' + data.index + '&room=' + data.room + '&name=' + pName;
        });

        socket.on('finishGame', (room) => {
            window.location.href='./gameoverplayer?room=' + room;
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