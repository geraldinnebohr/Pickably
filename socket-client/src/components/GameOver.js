import React from 'react';

import './Styles/GameOver.css'

class GameOver extends React.Component {
    render() {
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
                        <div className="winner">Nil</div>
                        <div className="winner">Emm</div>
                        <div className="winner">Geral</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameOver;