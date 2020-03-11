import React from 'react';

import './Styles/Nickname.css';

class Nickname extends React.Component {
    render() {
        return (
            <div className="grid_container_light">
                <div className="nickname__container">
                    <div className="nickname__content">
                        Before starting, <br/> identify yourself please.
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Nickname;