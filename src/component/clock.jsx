import React from "react";


class Clock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        return <div>{this.props.time}</div>;
    }
}

export default Clock;