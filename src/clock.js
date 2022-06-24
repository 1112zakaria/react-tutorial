import React from "react";

export function ClockFn(props) {
    return (
        <div>
            <h1>Clock:</h1>
            <h2>It is {props.date.toLocaleTimeString()}.</h2>
        </div>
    );
}

export class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID)
    }
    tick() {
        // Note that state updates are aysnc, so can't
        // increment state variables in certain way (not shown)
        this.setState({
            date: new Date()
        });
    }
    render() {
        return (
            <div>
                <h1>Clock obj:</h1>
                <h2>Time: {this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}

export function clockTick(root) {
    root.render(<ClockFn date={new Date()} />);
}