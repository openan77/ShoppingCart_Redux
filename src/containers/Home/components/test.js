import React from 'react';

export default class first extends React.Component {
    state ={
        count: 2,
    };

    addPlus = () => {
        this.setState({
            count: this.state.count += 1,
        });
    }

    render() {
        return (
          <div>
            <h1>{this.state.count}</h1>
            <button onClick={this.addPlus}>PLUS!</button>
          </div>
        );
    }
}
