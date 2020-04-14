import React from 'react';
import TimePicker from 'react-time-picker';

export default class TimePick extends React.Component {
  state = {
    time: '10:00'
  };

  onChange = time => this.setState({ time });

  render() {
    return (
      <div>
        <TimePicker onChange={this.onChange} value={this.state.time} />
      </div>
    );
  }
}
