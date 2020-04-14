import React from 'react';
import { Mutation } from '@apollo/react-components';
import { gql } from 'apollo-boost';
import Calendar from '../Calendar/Calendar';
import timezone from 'moment-timezone';
import './Create.css';
import Button from '../../Simple/Button/Button';

const CREATE_MEETING = gql`
  mutation createMeeting(
    $title: String!
    $description: String!
    $duration: Int!
    $timezone: String!
    $availability: [Int!]!
    $participants: [String!]!
  ) {
    createMeeting(
      title: $title
      description: $description
      duration: $duration
      timezone: $timezone
      availability: $availability
      participants: $participants
    ) {
      title
      author
      description
      duration
      timezone
      availability
      participants {
        user_id
      }
    }
  }
`;

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingName: '',
      email: '',
      yourInitials: '',
      lengthOfMeeting: 0,
      timeZone: timezone.tz.guess(),
      rtnArr: []
    };
  }

  handleSubmit(e, createMeeting) {
    e.preventDefault();
    createMeeting({
      variables: {
        title: this.state.meetingName,
        description: '',
        duration: parseInt(this.state.lengthOfMeeting),
        timezone: this.state.timeZone,
        availability: this.state.rtnArr,
        participants: this.state.participants
      }
    }).catch((error) => console.log(error));
    console.log('Create Meeting Test');
  }

  handleCalendarChange(returnArr) {
    this.setState({
      rtnArr: returnArr
    });
  }

  render() {
    console.log(this.state);
    return (
      <Mutation mutation={CREATE_MEETING}>
        {(createMeeting) => (
          <div className='create-container'>
    
            <div>
              <h2>Create a Meeting</h2>
              <Calendar
                handleCalendarChange={this.handleCalendarChange.bind(this)}
              />
            </div>
              <form
                className="create-form"
                onSubmit={(e) => {
                  this.handleSubmit(e, createMeeting);
                }}
              >
                <label htmlFor="meetingName">Meeting Name</label>
                <input
                  className="join-input"
                  required
                  name="meetingName"
                  id="meetingName"
                  placeholder="Meeting Name"
                  type="text"
                  onChange={(e) =>
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
                  onChange={(e) =>
                    this.setState({ email: e.target.value.trim() })
                  }
                ></input>
                <label htmlFor="yourInitials">Your Initials</label>
                <input
                  className="join-input"
                  required
                  name="yourInitials"
                  id="yourInitials"
                  placeholder="Your Initials"
                  type="text"
                  onChange={(e) =>
                    this.setState({ yourInitials: e.target.value.trim() })
                  }
                ></input>
                <label htmlFor="lengthOfMeeting">Length of Meeting</label>
                <input
                  className="join-input"
                  required
                  name="lengthOfMeeting"
                  id="lengthOfMeeting"
                  placeholder="Length of Meeting"
                  type="number"
                  onChange={(e) =>
                    this.setState({ lengthOfMeeting: e.target.value.trim() })
                  }
                ></input>
                <label htmlFor="timeZone">Time Zone</label>
                <input
                  className="join-input"
                  required
                  name="timeZone"
                  id="timeZone"
                  value={this.state.timeZone}
                  placeholder="Time Zone"
                  type="text"
                  disabled
                  onChange={(e) =>
                    this.setState({ timeZone: e.target.value.trim() })
                  }
                ></input>
                <input
                  className="join-input"
                  required
                  name="participants"
                  id="participants"
                  placeholder="Type in email adresses of participants"
                  type="text"
                  onChange={(e) => {
                    const participants = e.target.value.trim().split(', ');
                    this.setState({ participants: participants });
                  }}
                ></input>

                <Button>Submit</Button>
              </form>
         
          </div>
        )}
      </Mutation>
    );
  }
}
