import React from 'react';

class Question extends React.Component {
    state = {
        loading: true,
        error: null,
        index: 1,
        data: [ ],
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
            this.setState({ loading: true, error: null });

            try {
                const response = await fetch("http://localhost:5500/questionary/5e44e0a71c9d440000177bf7/question/" + this.state.index);
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
        
        
        return (
            <div>
                <div>
                    <div>
                        <p>{this.state.data.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}


export default Question;