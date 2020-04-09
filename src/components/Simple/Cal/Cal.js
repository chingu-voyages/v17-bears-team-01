import React from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './Cal.css';

export default class Cal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  onChange = date => this.setState({ date });

  onClickDay(value) {
    console.log(moment(value).format('dddd'), 'test day click');
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
    );
  }
}
