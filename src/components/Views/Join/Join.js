import React from 'react';
import Nav from '../../Simple/Nav/Nav';
import { Query, Mutation } from '@apollo/react-components';
import { gql } from 'apollo-boost';
import Calendar from '../Calendar/Calendar';
import './Join.css';

const JOIN_MEETING = gql`
  mutation joinMeeting($id: ID!, $intervals: [Int]!) {
    joinMeeting(id: $id, intervals: $intervals) {
      title
      author
      description
      duration
      timezone
      availability
      participants {
        user_id
        intervals
      }
    }
  }
`;

// eslint-disable-next-line no-unused-vars
const GET_MEETINGS = gql`
  query {
    getJoinMeetings {
      id
      title
      author
      duration
      timezone
      availability
      participants {
        user_id
        intervals
      }
    }
  }
`;

export default class Join extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeMeeting = this.onChangeMeeting.bind(this);
    this.handleCalendarChange = this.handleCalenderChange.bind(this);
    this.state = {
      meetingName: '',
      email: '',
      yourInitials: '',
      timeZone: '',
      error: null,
      currentMeeting: '',
      rtnArr: []
    };
  }

  onChangeMeeting(e, meetingID) {
    this.setState({
      currentMeeting: meetingID
    });
  }

  handleCalenderChange(returnArr) {
    this.setState({
      rtnArr: returnArr
    });
  }

  handleSubmit(e, joinMeeting) {
    e.preventDefault();
    // ERRORS TO DISPLAY
    if (this.state.currentMeeting === '') {
      return console.log('Please select a meeting');
    }
    console.log(this.state.rtnArr);
    if (this.state.rtnArr.length === 0) {
      return console.log('Please select a time');
    }
    joinMeeting({
      variables: {
        id: this.state.currentMeeting,
        intervals: this.state.rtnArr
      }
    })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    console.log('Meeting Created!');
  }

  render() {
    return (
      <div className="join-container">
        <h2>Your Meetings</h2>
        <div>
          <Query query={GET_MEETINGS}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;
              //scuffed
              if (data.getJoinMeetings === []) {
                return 'Nothing to show';
              }
              //PRINT MEETING DATA
              console.log(data);
              return (
                <ul>
                  {data &&
                    data.getJoinMeetings.map((meeting) => (
                      <div key={meeting.id}>
                        <li key={meeting.id}>
                          <p>{meeting.title}</p>
                          <p>{meeting.duration}</p>
                          <p>{meeting.availability[0]}</p>
                        </li>
                        <button
                          type="button"
                          onClick={(e) => {
                            this.onChangeMeeting(e.target, meeting.id);
                          }}
                          className="selectMeeting"
                        >
                          Select
                        </button>
                      </div>
                    ))}
                </ul>
              );
            }}
          </Query>
          <Mutation mutation={JOIN_MEETING}>
            {(joinMeeting) => (
              <div>
                <div>
                  <Nav />
                  <form
                    className="join-form"
                    onSubmit={(e) => {
                      this.handleSubmit(e, joinMeeting);
                    }}
                  >
                    <button className="time-zone-button">
                      Find My Time Zone
                    </button>
                    <button className="join-button" type="submit">
                      submit
                    </button>
                    {/* {this.state.error ? (
                    <p className="error">{this.state.error}</p>
                  ) : (
                    <div className="error-message">
                      <p>Hmm...</p>
                      <p>We do not see that meeting</p>
                    </div>
                  )} */}
                  </form>
                </div>
                <div>
                  {this.state.currentMeeting && (
                    <Calendar
                      handleCalendarChange={this.handleCalendarChange.bind(
                        this
                      )}
                    />
                  )}
                </div>
              </div>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

/* <label htmlFor="meetingName">Meeting Name</label>
              <input
                className="join-input"
                required
                name="meetingName"
                id="meetingName"
                placeholder="Meeting Name"
                type="text"
                onChange={e =>
                  this.setState({ meetingName: e.target.value.trim() })
                }
              ></input>
              <label htmlFor="email">Email</label>
              <input
                className="join-input"
                required
                name="email"
                id="email"
                placeholder="Email"
                type="email"
                onChange={e => this.setState({ email: e.target.value.trim() })}
              ></input>
              <label htmlFor="yourInitials">Your Initials</label>
              <input
                className="join-input"
                required
                name="yourInitials"
                id="yourInitials"
                placeholder="Your Initials"
                type="text"
                onChange={e =>
                  this.setState({ yourInitials: e.target.value.trim() })
                }
              ></input>
              <label htmlFor="timeZone">Time Zone</label>
              <input
                className="join-input"
                required
                name="timeZone"
                id="timeZone"
                placeholder="Time Zone"
                type="text"
                onChange={e =>
                  this.setState({ timeZone: e.target.value.trim() })
                }
              ></input> */
