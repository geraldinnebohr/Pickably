import React from 'react';

import './Styles/Game.css';

class Game extends React.Component {
    state = {
        loading: true,
        error: null,
        data: {
            score: '10',
        },
        correct: true
    };

    componentDidMount() {
        this.fetchData();
    };

    fetchData = async () => {
            this.setState({ loading: true, error: null });
    }

    handleClick = e => {
        e.preventDefault();
        this.setState({ loading: true, error: null });

        // try {

        // }
            try {
                fetch("http://localhost:5500/poll", {
                    method: 'PUT',
                    body: JSON.stringify(this.state.data),
                    headers:{
                        'Content-Type': 'application/json'
                      }
                }).then(res => {return res})
                this.setState({ loading: false });
                console.log("done!");
            } catch (error) {
                console.log(error);
                this.setState({ loading: false, error: error });
            }
    };


    render() {
        const iconsLeft = ["squares__circle", "squares__triangle"]
        let iconLeft = []
        iconsLeft.forEach(il => {
            iconLeft.push(
                <button onClick={this.handleClick} className={il}></button>
            )
        })
        const iconsRight = ["squares__square", "squares__ex"]
        let iconRight = []
        iconsRight.forEach(ir => {
            iconRight.push(
                <button onClick={this.handleClick} className={ir}></button>
            )
        })
        return (
            <div className="grid_container_light">
                <div className="child__content__game">
                    <div className="content__squares">
                       {iconLeft}
                       {iconRight}
                    </div>
                    <div className="content__score"></div>
                </div>
            </div>
        )
    }
}

export default Game;