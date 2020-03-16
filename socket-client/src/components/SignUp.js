import React from 'react';

import './Styles/SignUp.css';
import Twitter from '../images/twitter.svg';
import Google from '../images/google.svg';
import Facebook from '../images/facebook.svg';
import Logo from "../images/PICKABLY.png"

class SignUp extends React.Component {

    handleClick = () => {
        window.location.href='./login'
    }

    render() {
        return (
            <div className="grid_container_dark">
                <div className="child__content__signup">
                    <div className="login__right">
                        <div className="signup__title"> Create Account</div>
                        <div className="social__buttons__auth">
                            <img className="social__icons__auth" src={Twitter} alt="Twitter Button"/>
                            <img className="social__icons__auth" src={Google} alt="Google Button"/>
                            <img className="social__icons__auth" src={Facebook} alt="Facebook Button"/>
                        </div>
                        <div className="login__text">or use your email for registration:</div>
                        <form action="">
                            <input type="text" placeholder="Name" className="signup__input"/>
                            <input type="text" placeholder="Email" className="signup__input"/>
                            <input type="text" placeholder="Password" className="signup__input"/>
                        </form>
                        <button className="signup__button__sign">SIGN UP</button>
                    </div>
                    <div className="login__left__sign">
                        <div className="title__login__right">We're glad to <br/> have you here!</div>
                        <div>Do you already have an account?</div>
                        <button className="login__left__button" onClick={this.handleClick} >LOG IN</button>
                        <img src={Logo} alt="Logo Pickably" className="login__logo"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;