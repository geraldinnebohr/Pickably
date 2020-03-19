import React from 'react';

import './Styles/GameOver.css'

class GameOverPlayer extends React.Component {
    state = {
        loading: true,
        error: null,
        data: [ ],
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const room = params.get('room');
        this.setState({ loading: true, error: null });

        try {
            const response = await fetch("https://pickably.herokuapp.com/room/" + room + "/ranking");
            const data = await response.json();
            this.setState({ loading: false, data: data });
        } catch(error) {
            this.setState({ loading: false, error: error });
        }
    }

    handleClick = () => {
        window.location.href='./play'
    }

    render() {
        let i = 0
        const winClass = ["winner__second", "winner__first", "winner__third"]
        return (
            <div className="grid_container_dark">
                <div className="gameover">
                    <h1 className="gameover__title">And the winner is...</h1>
                    <div className="gameover__chart">
                        <div className="gameover__second">
                            <div className="second__chart">2°</div>
                        </div>
                        <div className="gameover__first">
                            <div className="first__chart">1°</div>
                        </div>
                        <div className="gameover__third">
                            <div className="third__chart">3°</div>
                        </div>
                            {this.state.data.map((winners) => {
                                return (
                                    <div className={winClass[i++]}>{winners.userName}</div>
                                )
                            })}
                    </div>
                    <button className="winner__button" onClick={this.handleClick}>Back to play</button>
                </div>
            </div>
        )
    }
}

export default GameOverPlayer;