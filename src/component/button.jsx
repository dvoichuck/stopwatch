import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    handleEvent = (purpose) => {
        console.log(purpose)
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
                    console.log(this.props)
                    let flag = false;
                    let click = this.props.clicks + 1
                    if (click === 1) {
                        setTimeout(function () {
                            if (click === 2) {
                                flag = true
                            }
                            click = 0;
                        }, 300);
                    }
                    if (flag) {
                        console.log(click)
                        this.props.waitTimer(this.props.subscriber, this.props.isTimerStart);
                    }
                    else {
                        console.log(click)
                        this.props.waitTimer(this.props.clicks)
                    }

                    break;
            }
        }
    }

    render() {
        return (
            <button
                onClick={() => this.handleEvent(this.props.purpose)}>
            </button>
        )
    }
}

export default Button;