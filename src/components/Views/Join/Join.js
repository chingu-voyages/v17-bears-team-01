import React from 'react';
import { Query, Mutation } from '@apollo/react-components';
import { gql } from 'apollo-boost';
import './Join.css';
import Button from '../../Simple/Button/Button';

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
                <ul className="meeting-list">
                  {data &&
                    data.getJoinMeetings.map((meeting) => (
                      <div className="options" key={meeting.id}>
                        <li key={meeting.id}>
                          <p>Meeting Name: {meeting.title}</p>
                          <p>Meeting Length: {meeting.duration} hour</p>
                        </li>
                        <Button
                          type="button"
                          onClick={(e) => {
                            this.onChangeMeeting(e.target, meeting.id);
                          }}
                          className="selectMeeting"
                        >
                          Select
                        </Button>
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
                  {/* <Nav /> */}
                  <form
                    className="join-form"
                    onSubmit={(e) => {
                      this.handleSubmit(e, joinMeeting);
                    }}
                  ></form>
                </div>
                {/* <div>
                  {this.state.currentMeeting && (
                    <Calendar
                      handleCalendarChange={this.handleCalendarChange.bind(
                        this
                      )}
                    />
                  )}
                </div> */}
              </div>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}
