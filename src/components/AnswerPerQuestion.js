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
            const response = await fetch("http://localhost:5500/questionary/5e44e0a71c9d440000177bf7/question/5e40392306704b226374b16f/answers");
            const data = await response.json();
            // .then(response => response.json())
            // .then(data => {this.setState({data: data.description})
            this.setState({
                data: data,
            });
                // try {
                //     const data = await data.questionary();
                //     this.setState({ loading:false, data: data });
                //     console.log("dataa");
                // } catch (error){
                //     this.setState({ loading: false, error: error });
                //     console.log("erroooor");
                // }
        }
    

    render() {
        // if (this.state.loading === true) {
        //     return 'loading...';
        // }
        let i = 0
        const iconClass = ["content__circle", "content__triangle", "content__square", "content__ex"]
        return (
            <div className="grid_container">
                <div className="child__content">
                    <div className="content__left">{this.state.data.description} </div>
                    <div className="content__right" >
                        

                        <div className="content__container">
                            {this.state.data.answers.map((answer) => {
                                return (
                                    <>
                                    <div className={iconClass[i++]}></div>
                                    
                                    <li key={answer._id} className="circulo__answer">{answer.description}
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