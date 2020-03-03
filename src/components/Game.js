import React from 'react';

import './Styles/Game.css';

class Game extends React.Component {
    state = {
        loading: true,
        error: null,
        data: {
            answers: [],
        },
    };

    componentDidMount() {
        this.fetchData();
    };

    fetchData = async () => {
            this.setState({ loading: true, error: null });

            try {
                const response = await fetch("http://localhost:5500/questionary/5e44e0a71c9d440000177bf7/question/5e40392306704b226374b16f/answers");
                const data = await response.json();
                this.setState({ loading: false, data: data });
            } catch (error) {
                this.setState({ loading: false, error: error });
            }
        }
    






    handleClick = e => {
        console.log("clicked");
    }


    render() {
        const iconsLeft = ["squares__circle", "squares__triangle"]
        let iconLeft = []
        iconsLeft.forEach(il => {
            iconLeft.push(
                <button className={il}></button>
            )
        })
        const iconsRight = ["squares__square", "squares__ex"]
        let iconRight = []
        iconsRight.forEach(ir => {
            iconRight.push(
                <button  onClick={this.handleClick} className={ir}></button>
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