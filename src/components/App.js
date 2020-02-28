import React, { Component } from 'react';

import Square from './Square';
import AnswerPerQuestion from './AnswerPerQuestion';

class App extends Component {
    render() {
        return (
            <div>
                {/* <Square /> */}
                <AnswerPerQuestion />
            </div>
        );
    }
}

export default App;