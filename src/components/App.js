import React, { Component } from 'react';

import Square from './Square';
import AnswerPerQuestion from './AnswerPerQuestion';

class App extends Component {
    render() {
        return (
            <div>
                <AnswerPerQuestion />
                {/* <Square /> */}
            </div>
        );
    }
}

export default App;