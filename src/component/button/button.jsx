import React from 'react';
import styles from './button.module.css'

class Button extends React.Component {
    handleEvent = (purpose) => {
        switch (purpose) {
            case 'Start': {
                this.props.startTimer()
                break;
            }
            case 'Stop': {
                this.props.stopTimer()
                break
            }
            case 'Reset': {
                this.props.resetTimer();
                break;
            }
            case 'Wait': {
                this.props.waitTimer()
                break;
            }
        }
    }

    render() {
        return (
            <button disabled={this.props.disabled} className={styles.button} onClick={() => this.handleEvent(this.props.purpose)}>
                {this.props.purpose}
            </button>
        )
    }
}

export default Button;