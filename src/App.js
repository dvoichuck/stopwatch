import './App.css';
import React from "react";
import Clock from './component/clock';
import Button from './component/button';
import {Subscription, Observable} from "rxjs";

class App extends React.Component {
    constructor() {
        super();

        this.clicks = 0
        this.counter = 0;
        this.state = {counter: this.counter};
        this.subscriber = Subscription;
        this.isTimerStart = false;
        this.timer = new Observable((observer) => {
            const IntervalId = setInterval(() => {
                observer.next(this.counter++);
            }, 1000);

            return () => {
                clearInterval(IntervalId);
            }
        });
    }

    start = (observable) => {
        if (this.isTimerStart === false) {
            this.isTimerStart = true
            this.subscriber = observable.subscribe((data) => {
                this.setState({counter:data})
            })
        }
    }

    stop = (subscriber) => {
        if (subscriber && this.isTimerStart) {
            subscriber.unsubscribe();
            this.isTimerStart = false
            this.counter = 0;
            this.setState({counter: this.counter})
        }
    }

    reset = (subscriber) => {
        if (subscriber) {
            this.counter = 0;
            this.setState({counter: this.counter})
        }
    }

    wait = (subscriber, isTimerStart) => {
        if (subscriber && isTimerStart) {
            this.isTimerStart = false;
            subscriber.unsubscribe();
        }
    }

    correctClock(sec) {
        let hour = 0
        let min = 0
        for (sec ;sec >= 60; sec -= 60) {
            if (sec >= 60) {
                min += 1
            }

            if (min >= 60) {
                hour += 1
                min = 0
            }
        }
        if (sec < 10) {
            sec = '0' + String(sec)
        }

        if (min < 10) {
            min = '0' + String(min)
        }

        if (hour < 10) {
            hour = '0' + String(hour)
        }
        return [hour, min, sec].join(':')
    }

    render() {
        return (
            <div className="stopWatch">
                <div className="clock">
                    <Clock
                        time={this.correctClock(this.state.counter)}
                    />
                </div>
                <div className="button">
                    <Button
                        startTimer={this.start}
                        observable={this.timer}
                        purpose='Start'/>
                    <Button
                        stopTimer={this.stop}
                        subscriber={this.subscriber}
                        purpose='Stop'/>
                    <Button
                        resetTimer={this.reset}
                        subscriber={this.subscriber}
                        purpose='Reset'/>
                    <Button
                        waitTimer={this.wait}
                        subscriber={this.subscriber}
                        isTimerStart={this.isTimerStart}
                        purpose='Wait'/>
                </div>
            </div>
        );
    }
}

export default App;
