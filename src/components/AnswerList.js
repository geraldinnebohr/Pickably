import React from 'react';

class AnswerList extends React.Component {
    render() {
        return (
            <ul>
                {/* <ul className="content__circulo"></ul> */}
                    {this.props.answer.map((answer) => {
                         return (
                            <li key={answer.id}>
                                {answer.name} {answer.lastname}
                            </li>
                        )
                    })}
            </ul>
        )
    }
}

export default AnswerList;