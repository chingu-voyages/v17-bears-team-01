import React from 'react';
import AppContext from '../../../context/app-context';
import Calendar from 'react-calendar';
import moment from 'moment';
import styles from './Calendar.module.scss';
import './Cal.css';
// import { Link } from 'react-router-dom';

export default class CalendarView extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.onClickDay = this.onClickDay.bind(this);
    this.state = {
      userDate: [],
      date: new Date(),
      time: {}
    };
  }

  onChange = (date) => this.setState({ date });

  onChangeTime(data, day) {
    this.setState((state) => {
      state.time[data.id] = day + ' ' + data.value;
      let rArr = [];
      // eslint-disable-next-line
      for (let [key, value] of Object.entries(this.state.time)) {
        rArr.push(moment(value, 'MMM Do YY HH:mm').unix());
      }
      this.props.handleCalendarChange(rArr);
    });

    console.log('test time', this.state.time);
  }

  onClickDay(value) {
    let days = moment(value).format('MMM Do YY');
    this.context.updateCalDays(days);
    this.setState((state) => {
      state.userDate.push(days);
    });
  }

  // onSubmit(){
  //     console.log("works");
  //     let returnArr = [];
  //     //Convert time objects to unix using moment
  //     // eslint-disable-next-line
  //     for(let [key, value] of Object.entries(this.state.time)){
  //         returnArr.push(moment(value,"MMM Do YY HH:mm").unix());
  //     }
  //     this.props.handleSubmit(returnArr, this.props.meeting);
  // }

  render() {
    return (
      <div className={styles.calendarView}>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          onClickDay={this.onClickDay}
        />
        <div className={styles.meetAt}>
          <div>
            <ul className={styles.testing}>
              {this.state.userDate.map((day, index) => (
                <li key={day}>
                  <input
                    type="time"
                    id={index}
                    name="meetingTime"
                    onChange={(e) => {
                      this.onChangeTime(e.target, day);
                    }}
                  ></input>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

/*
<Link to="/AllTimes">
                    <button onClick={this.onSubmit()} className='submitTime' type='submit'>Submit Times</button> 
                </Link>
                */
