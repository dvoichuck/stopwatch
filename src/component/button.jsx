import React from 'react';
import styles from './button.module.css'
let click = 0

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    handleEvent = (purpose) => {
        switch (purpose) {
            case 'Start': {
                this.props.startTimer(this.props.observable)
                break;
            }
            case 'Stop': {
                this.props.stopTimer(this.props.subscriber)
                break
            }
            case 'Reset': {
                this.props.resetTimer(this.props.subscriber);
                break;
            }
            case 'Wait': {
                click++
                if (click === 1)
                    setTimeout(function () {
                        click = 0;
                    }, 300);
                if (click === 2)
                    this.props.waitTimer(this.props.subscriber, this.props.isTimerStart);
                break;
            }
        }
    }

    render() {
        return (
            <button  className={styles.button} onClick={() => this.handleEvent(this.props.purpose)}>
                {this.props.purpose}
            </button>
        )
    }
}

export default Button;