import React from 'react';

import './Styles/AnswerPerQuestion.css';

class AnswerPerQuestion extends React.Component {
    state = {
        loading: true,
        error: null,
        data: undefined
    };

    componentDidMount() {
        // this.fetchData();
        async () => {
            fetch("https://localhost:5000/questionaries/")
            .then(res => res.json())
            .then(data => this.setState({data: data.}));
                // try {
                //     const data = await response.questionaries();
                //     this.setState({ loading:false, data: data });
                //     console.log("dataa");
                // } catch (error){
                //     this.setState({ loading: false, error: error });
                //     console.log("erroooor");
                // }
        }
    }

    // fetchData = () => {
    //     this.setState({ loading: true, error: null });
    //     try {
    //         const data = 
    //         this.setState({ loading:false, data: data });
    //     } catch (error){
    //         this.setState({ loading: false, error: error });
    //     }
    // }

    render() {
        if(this.state.loading === true) {
            return 'loading';
        }


        return (
            <div className="grid_container">
                <div className="child__content">
                    <div className="content__left">Pregunta </div>
                    <div className="content__right" >
                        

                        <div className="content__container">
                            <div className="content__circulo"></div>
                            {this.state.data.map((answer) => {
                                return (
                                    <li key={answer.id} className="circulo__answer">
                                        <p>{answer.name} {answer.lastname}</p>
                                    </li>
                                )
                            })}
                            {/* <div className="circulo__answer">Respuesta</div>

                            <div class="content__triangulo"></div>
                            <div class="triangulo__answer">Lorem ipsum dolor sit, amen aefrbve ertwef</div>

                            <div class="content__cuadrado"></div>
                            <div class="cuadrado__answer">Lorem ipsum dolor sit, amen aefrbve ertwef</div>

                            <div class="content__equis"></div>
                            <div class="equis__answer">Lorem ipsum dolor sit, amen aefrbve ertwef</div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AnswerPerQuestion;