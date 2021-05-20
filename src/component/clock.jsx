import React from "react";
import styles from './clock.module.css'

class Clock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div id={styles.div} className={styles.clock}>{this.props.time}</div>;
    }
}

export default Clock;