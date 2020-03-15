import React from 'react';

import './Styles/SignUp.css';

class SignUp extends React.Component {

    handleClick = () => {
        window.location.href='./login'
    }

    render() {
        return (
            <div className="grid_container_dark">
                <div className="child__content__signup">
                    <div className="content__signup__left">
                        Create Account
                        <div className="social__buttons">
                            <button className="signup__social">f</button>
                            <button className="signup__social">g</button>
                            <button className="signup__social">t</button>
                        </div>
                        or use your email for registration:
                        <form action="">
                            <input type="text" placeholder="Name"/>
                            <input type="text" placeholder="Email"/>
                            <input type="text" placeholder="Password"/>
                        </form>
                        <button className="signup__button">SIGN UP</button>
                    </div>
                    <div className="content__signup__right">
                        We're glad to have you here! <br/>
                        Do you already have an account?
                        <button className="login__button" onClick={this.handleClick} >LOG IN</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;