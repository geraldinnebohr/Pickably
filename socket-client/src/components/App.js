import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './Layout';
import Game from './Game';
import AnswerPerQuestion from './AnswerPerQuestion';
import Results from './Results';
import Play from './Play';
import Nickname from './Nickname';
import Pin from './Pin';
import Question from './Question';
import Loading from './Loading';
import Pruebas from './pruebas';
import SignUp from './SignUp';
import LogIn from './Login';
import Home from './Home';
import New from './New';
import Edit from './Edit';
import GameOver from './GameOver';
import GameOverPlayer from './GameOverPlayer';

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
                    <Route exact path="/question" component={Question}/>
                    <Route exact path="/loading" component={Loading}/>
                    <Route exact path="/pruebas" component={Pruebas}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/login" component={LogIn}/>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/new" component={New}/>
                    <Route exact path="/edit" component={Edit}/>
                    <Route exact path="/gameover" component={GameOver}/>
                    <Route exact path="/gameoverplayer" component={GameOverPlayer}/>
                </Switch>
            {/* </Layout> */}
        </BrowserRouter>
    );
}

export default App;