import React from 'react';
import AppContext from '../../../context/app-context';
import Calendar from 'react-calendar';
import moment from 'moment';
import styles from './Calendar.module.scss';
import './Cal.css';

//import TimePick from '../../Simple/TimePicker/TimePicker'

export default class CalendarView extends React.Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.onClickDay = this.onClickDay.bind(this)
        this.state = {
            userDate: [],
            date: new Date(),
            time: []
        }
    }

    onChange = date => this.setState({ date })

    onChangeTime() {
        this.setState((time) => {
            this.state.time.push(time)
        })
        console.log('test time', this.state.time)
    }

    onClickDay(value) {
        let days = moment(value).format('MMM Do YY')
        this.context.updateCalDays(days);
        this.setState((state) => {
            state.userDate.push(days)
        })
    }

    render() {
        return(
            <div className={styles.calendarView}>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    onClickDay={this.onClickDay}
                />
                <div className={styles.meetingLength}>
                    <p>Meeting Length: {this.context.meetingLength}</p>
                </div>
                <div className={styles.meetAt}>
                    <p>You could meet at:</p>
                    <div className='testing'>
                        <ul>
                            {this.state.userDate.map(day => 
                                <li key={day}>
                                    {day} 
                                    {/* <TimePick 
                                        onChangeTime={this.onChangeTime}
                                        value={this.state.time}
                                    /> */}
                                    <input 
                                        type="time" 
                                        id="meetingTime" 
                                        name="meetingTime"
                                        onChange={(e) => {this.onChangeTime(e.target.value)}}>
                                    </input>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <button className='submitTime' type='submit'>Submit Times</button> 
            </div>
        )
    }
}