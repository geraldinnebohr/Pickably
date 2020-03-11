import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './Layout';
import Game from './Game';
import AnswerPerQuestion from './AnswerPerQuestion';
import Results from './Results';
import Login from '../pages/Login';

function App() {
    return (
        <BrowserRouter>
            {/* <Layout> */}
                <Switch>
                    <Route exact path="/answers" component={AnswerPerQuestion} />
                    <Route exact path="/game" component={Game} />
                    <Route exact path="/results" component={Results}/>
                </Switch>
            {/* </Layout> */}
        </BrowserRouter>
    );
}

export default App;