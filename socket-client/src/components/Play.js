import React from 'react';

import "./Styles/Play.css";
import Logo from "../images/PICKABLY.png"

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            loading: true,
            error: null,
            data: [ ],
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({ loading: true, error: null });

        try {
            const response = await fetch("http://localhost:5500/room/" + this.state.value);
            const data = await response.json();
            this.setState({ loading: false, data: data });
            console.log("http://localhost:5500/room/" + this.state.value)
            if (this.state.data === null) {
                alert('NO Existe el pin: ' + this.state.value);
            } else {
                // alert(' existe el pin: ' + this.state.value);
                window.location.href='./nickname?room=' + this.state.value;
            }
        } catch (error) {
            this.setState({ loading: false, error: error });
        }
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className="play__container">
                <div className="play__pin">
                <img src={Logo} alt="Logo Pickably" className="play__logo"/>

                    <input type="text" placeholder="Game PIN" className="play__input" value={this.state.value} onChange={this.handleChange}/>
                    <button className="play__button" type="submit" value="Submit" onClick={this.fetchData}>PLAY</button>
                </div>

                <div className="game__container">
                    or create a pickably game:
                    <button className="create__game">CREATE</button>
                </div>
            </div>
        )
    }
}

export default Play;