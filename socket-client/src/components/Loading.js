import React from 'react';
import socketIOClient from "socket.io-client";

import './Styles/Loading.css'
import Gif from '../images/loader.gif';

class Loading extends React.Component {
    render() {
        const socket = socketIOClient("localhost:5500");
        socket.once('time to vote', (i) => {
            window.location.href='./game?index=' + i;
        })

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