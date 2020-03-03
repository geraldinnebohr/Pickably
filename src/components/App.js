import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from '../components/Layout';
import Game from '../components/Game';
import Login from '../pages/Login';
import AnswerPerQuestion from './AnswerPerQuestion';

function App() {
    return (
        <BrowserRouter>
            {/* <Layout> */}
                <Switch>
                    <Route exact path="/answers" component={AnswerPerQuestion} />
                    <Route exact path="/game" component={Game} />
                </Switch>
            {/* </Layout> */}
        </BrowserRouter>
    );
}

export default App;