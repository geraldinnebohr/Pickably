import React from 'react';

import './Styles/SignUp.css';
import Twitter from '../images/twitter.svg';
import Google from '../images/google.svg';
import Facebook from '../images/facebook.svg';
import Logo from "../images/PICKABLY.png"

class SignUp extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick = () => {
        window.location.href='./login'
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        const name = data.get('userName');
        const email = data.get('email');
        const password = data.get('pwd');

        if (!name || !email || !password) {
            alert('Missing information')
        }
        fetch("https://pickably.herokuapp.com/user/signup", {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
        console.log('Success:', data);
        window.location.href='./login';
        })
        .catch((error) => {
        console.error('Error:', error);
        window.location.href='./signup'
        });
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
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Name" className="signup__input" id="userName" name="userName"/>
                            <input type="text" placeholder="Email" className="signup__input" id="email" name="email"/>
                            <input type="text" placeholder="Password" className="signup__input" id="pwd" name="pwd"/>
                            <button className="signup__button__sign">SIGN UP</button>
                        </form>
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