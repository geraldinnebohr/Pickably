import React from 'react';

import './Styles/Login.css';

class LogIn extends React.Component {

    handleClick = () => {
        window.location.href='./signup';
    }

    render() {
        return (
            <div className="grid_container_dark">
                <div className="child__content__answer">
                    <div className="login__left">
                        Welcome back! <br/>
                        Are you new here?
                        <button onClick={this.handleClick} className="sign__up">SIGN UP</button>
                    </div>
                    <div className="login__right">
                    Sign in to Pickably
                        <div className="social__buttons">
                            <button className="signup__social">f</button>
                            <button className="signup__social">g</button>
                            <button className="signup__social">t</button>
                        </div>
                        or use your email account:
                        <form action="">
                            <input type="text" placeholder="Email"/>
                            <input type="text" placeholder="Password"/>
                        </form>
                        <button className="forgot__password">Forgot your password?</button>
                        <button className="signup__button">SIGN IN</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LogIn;