import React from 'react';

export default class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingName: '',
      email: '',
      yourInitials: '',
      timeZone: '',
      error: null
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('Joining Meeting Test');
  }

  render() {
    return (
      <div>
        <form className='join-form' onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor='meetingName'>Meeting Name</label>
          <input 
            className='joinInput'
            required
            name='meetingName'
            id='meetingName'
            placeholder='Meeting Name'
            type='text'
            onChange={e => this.setState({meetingName: e.target.value.trim()})}>
          </input>
          <label htmlFor='email'>Email</label>
          <input
            className='joinInput'
            required
            name='email'
            id='email'
            placeholder='Email'
            type='email'
            onChange={e => this.setState({email: e.target.value.trim()})}>
          </input>
          <label htmlFor='yourInitials'>Your Initials</label>
          <input 
            className='joinInput'
            required
            name='yourInitials'
            id='yourInitials'
            placeholder='Your Initials'
            type='text'
            onChange={e => this.setState({yourInitials: e.target.value.trim()})}>
          </input>
          <label htmlFor='timeZone'>Meeting Name</label>
          <input 
            className='joinInput'
            required
            name='timeZone'
            id='timeZone'
            placeholder='Time Zone'
            type='text'
            onChange={e => this.setState({timeZone: e.target.value.trim()})}>
          </input>
          <button className="time-zone-button">Find My Time Zone</button>
          <button className='joinButton' type='submit'>submit</button>
          {this.state.error ? <p className="error">{this.state.error}</p> : <div className='error-message'>
            <p>Hmm...</p>
            <p>We do not see that meeting</p>
          </div>
          }
        </form>
      </div>
    );
  }
}