import './App.css';
import React from "react";
import Clock from './clock/clock';
import Button from './button/button';
import {interval} from "rxjs";
import {tap} from "rxjs/operators";

class App extends React.Component {
    constructor() {
        super();
        this.counter = 0;
        this.state = {
            counter: this.counter,
            active: [false, true, true, true]
        };
        this.stream$  = interval(1000).pipe(
            tap(value => console.log(value))
        )
        this.subscriber = 0

    }

    start = () => {
        this.setState({active: [true, false, false, false]})
        this.subscriber = this.stream$.subscribe(value => this.setState({counter: this.counter++}))

    }

    stop = () => {
        this.subscriber.unsubscribe()
        this.setState({active: [false, true, true, true]})
        this.counter = 0;
        this.setState({counter: this.counter})
    }

    reset = () => {
        this.subscriber.unsubscribe()
        this.setState({active: [true, false, false, false]})
        this.counter = 0
        this.subscriber = this.stream$.subscribe(value => this.setState({counter: this.counter++}))
    }

    wait = () => {
        this.setState({active: [false, false, false, true]})
        this.subscriber.unsubscribe();
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
                        disabled={this.state.active[0]}
                        purpose='Start'/>
                    <Button
                        stopTimer={this.stop}
                        disabled={this.state.active[1]}
                        purpose='Stop'/>
                    <Button
                        resetTimer={this.reset}
                        disabled={this.state.active[2]}
                        purpose='Reset'/>
                    <Button
                        disabled={this.state.active[3]}
                        waitTimer={this.wait}
                        purpose='Wait'/>
                </div>
            </div>
        );
    }
}

export default App;
