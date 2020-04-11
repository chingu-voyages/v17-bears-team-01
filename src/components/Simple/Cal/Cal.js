import React from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './Cal.css';

export default class Cal extends React.Component {
    constructor(props) {
        super(props);
        this.onClickDay = this.onClickDay.bind(this)
        this.state = {
            date: new Date(),
            timeArrr: []
        }
    }

    onChange = date => this.setState({ date })

    onClickDay(value, day) {
        let days = moment(value).format('MMM Do YY')
        console.log(days);
        console.log(this.state.timeArrr);
        this.setState({
            timeArrr: this.timeArrr.push(days)
        })
    }
   
    render() {
        return (
            <div>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    onClickDay={this.onClickDay}
                />
            </div>
        )
    }
}