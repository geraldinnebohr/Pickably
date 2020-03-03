import React from 'react';

import './Styles/AnswerPerQuestion.css';

class AnswerPerQuestion extends React.Component {
    state = {
        loading: true,
        error: null,
        data: {
            answers: [],
        },
    };

    componentDidMount() {
        this.fetchData();
    };

    fetchData = async () => {
            this.setState({ loading: true, error: null });

            try {
                const response = await fetch("http://localhost:5500/questionary/5e44e0a71c9d440000177bf7/question/5e40392306704b226374b16f/answers");
                const data = await response.json();
                this.setState({ loading: false, data: data });
            } catch (error) {
                this.setState({ loading: false, error: error });
            }
        }
    

    render() {
        if (this.state.loading === true) {
            return 'loading...';
        }

        if (this.state.error) {
            return `Error: ${this.state.error.message}`;
        }

        let i = 0
        const iconClass = ["content__circle", "content__triangle", "content__square", "content__ex"]
        return (
            <div className="grid_container_dark">
                <div className="child__content__answer">
                    <div className="content__left">{this.state.data.description} </div>
                    <div className="content__right" >
                        <div className="content__container">
                            {this.state.data.answers.map((answer) => {
                                return (
                                    <>
                                    <div className={iconClass[i++]}></div>
                                    
                                    <li key={answer._id} className="content__answer">{answer.description}
                                    </li>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AnswerPerQuestion;