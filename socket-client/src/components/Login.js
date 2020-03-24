import React from 'react';
import './Styles/Login.css';

import Twitter from '../images/twitter.svg';
import Google from '../images/google.svg';
import Facebook from '../images/facebook.svg';
import Logo from "../images/PICKABLY.png"

class LogIn extends React.Component {

    handleClick = () => {
        window.location.href='./signup';
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch(process.env.URL + "/login", {
            method: 'POST',
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('pwd')
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        // .then((response) => {
        //     return response.json();
        //   })
        // .then((data) => {
        //     console.log(data)
        //     if (data.success){
        //         window.location.href='./home' 
        //     }
        // });
    }

    render() {
        return (
            <div className="grid_container_dark">
                <div className="child__content__answer">
                    <div className="login__left">
                        <div className="title__login__left"> Welcome back!</div>
                        <div> Are you new here?</div>
                        <button onClick={this.handleClick} className="login__left__button">SIGN UP</button>
                        <img src={Logo} alt="Logo Pickably" className="login__logo"/>
                    </div>
                    
                    <div className="login__right">
                    <div className="login__title"> Sign in to Pickably</div>
                        <div className="social__buttons__auth">
                            <img className="social__icons__auth" src={Twitter} alt="Twitter Button"/>
                            <img className="social__icons__auth" src={Google} alt="Google Button"/>
                            <img className="social__icons__auth" src={Facebook} alt="Facebook Button"/>
                        </div>
                        <div className="login__text"> or use your email account:</div>
                        {/* <form onSubmit={this.handleSubmit}> */}
                        <form action="/login" method="post">
                            <input type="email" placeholder="Email" className="login__input" id="email" name="email"/>
                            <input type="password" placeholder="Password" className="login__input" id="pwd" name="password"/>
                            <button className="signup__button">SIGN IN</button>
                        </form>
                        <button className="forgot__password">Forgot your password?</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LogIn;