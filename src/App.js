import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component"
import QuestionariesList from "./components/questionaries-list.component";
import AddQuestionary from "./components/add-questionary.component";
import QuestionsList from "./components/questions-list.component";
import AddQuestion from "./components/add-question.component";
import AnswersList from "./components/answers-list.component"
import AddAnswer from "./components/add-answer.component"

function App() {
  return (
    <Router>
      <Navbar />
      <br/>

      <Route path="/" exact component={QuestionariesList} />
      <Route path="/add" component={AddQuestionary} />
      <Route path="/:id/questions" component={QuestionsList} />
      <Route path="/:id/add/question" component={AddQuestion} />
      <Route path="/:id_questionary/question/:id_question/answers" component={AnswersList} />
      <Route path="/:id_questionary/question/:id_question/add/anwser" component={AddAnswer} />
    
    </Router>
  );
}

export default App;
