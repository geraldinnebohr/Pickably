import React from 'react';

import BackgroundDark from './BackgroundDark';
import BackgroundLight from './BackgroundLight';

function Layout(props) {
    return (
        <React.Fragment>
            {/* <BackgroundDark /> */}
            <BackgroundLight />
            {props.children}
        </React.Fragment>
    );
}

export default Layout;