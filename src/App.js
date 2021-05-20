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

    reset = () => {
        if (this.subscriber) {
            this.counter = 0;
            this.setState({counter: this.counter})
        }
    }

    wait = (clicks, subscriber, isTimerStart) => {
        if (clicks) {
            this.clicks = clicks;
        }
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
            <div className="App" id="stopWatch">
                <Clock
                    time={this.correctClock(this.state.counter)}
                />
                <Button
                    startTimer={this.start}
                    stopTimer={this.stop}
                    observable={this.timer}
                    isTimerStart={this.isTimerStart}
                    subscriber={this.subscriber}
                    purpose='Start'/>
                <Button
                    stopTimer={this.stop}
                    isTimerStart={this.isTimerStart}
                    subscriber={this.subscriber}
                    purpose='Stop'/>
                <Button
                    resetTimer={this.reset}
                    subscriber={this.subscriber}
                    purpose='Reset'/>
                <Button
                    waitTimer={this.wait}
                    subscriber={this.subscriber}
                    clicks={this.clicks}
                    isTimerStart={this.isTimerStart}
                    purpose='Wait'/>
            </div>
        );
    }
}

export default App;
