import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './Layout';
import Game from './Game';
import AnswerPerQuestion from './AnswerPerQuestion';
import Results from './Results';
import Play from './Play';
import Nickname from './Nickname';
import Pin from './Pin';
import Login from '../pages/Login';

function App() {
    return (
        <BrowserRouter>
            {/* <Layout> */}
                <Switch>
                    <Route exact path="/answers" component={AnswerPerQuestion} />
                    <Route exact path="/game" component={Game} />
                    <Route exact path="/results" component={Results}/>
                    <Route exact path="/play" component={Play}/>
                    <Route exact path="/nickname" component={Nickname}/>
                    <Route exact path="/pin" component={Pin}/>
                </Switch>
            {/* </Layout> */}
        </BrowserRouter>
    );
}

export default App;