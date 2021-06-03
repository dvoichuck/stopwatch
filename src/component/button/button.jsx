import React from 'react';
import styles from './button.module.css'
let click = 0

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
                click++
                if (click === 1)
                    setTimeout(function () {
                        click = 0;
                    }, 300);
                if (click === 2)
                    this.props.waitTimer();
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