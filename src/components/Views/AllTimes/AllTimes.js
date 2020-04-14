/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from 'react';
import styles from './AllTimes.module.scss';
import AppContext from '../../../context/app-context';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router';
import moment from 'moment';

const GET_USERS_AND_MEETING = gql`
  query($id: ID!) {
    getUsers(id: $id) {
      id
      email
    }
    getMeeting(id: $id) {
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

class AllTimes extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      meetingId: '',
      participants: [],
      vote: null,
      voted: false
    };
  }

  getMeetingId() {
    if (this.props.location.pathname.split(new RegExp('/alltimes/'))[1]) {
      const meetingId = this.props.location.pathname.split(
        new RegExp('/alltimes/')
      )[1];
      this.setState({ meetingId: meetingId });
    }
  }

  componentDidMount() {
    this.getMeetingId();
  }

  // buttonClick(time) {
  //   this.setState({
  //     vote: time,
  //     voted: true
  //   });
  //   console.log(this.state.vote);
  // }

  render() {
    return (
      <Query
        query={GET_USERS_AND_MEETING}
        variables={{
          id: this.state.meetingId
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          console.log(data);

          return (
            <div className={styles.timesContainer}>
              <header>
                <h2>User's availability</h2>
                <div className={styles.meetingInfo}>
                  <h3>required time:{data.getMeeting.duration} minutes</h3>
                </div>
              </header>

              <div>
                {data.getUsers.map((user, index) => (
                  <div key={index}>
                    <h3>{user.email} can meet at:</h3>
                    {user.id === data.getMeeting.author ? (
                      <div>
                        {data.getMeeting.availability.map((time, index) => (
                          <div className={styles.timeInfo} key={index}>
                            <p>
                              {moment.unix(time).format('MM/DD/YYYY, HH:mmA')}
                            </p>
                            {/* <button onClick={() => this.buttonClick(time)}>
                              vote
                            </button> */}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        {data.getMeeting.participants.map(
                          (participant, index) =>
                            participant.user_id === user.id ? (
                              <div key={index}>
                                {participant.intervals.map((time, index) => (
                                  <div className={styles.timeInfo} key={index}>
                                    <p>
                                      {moment
                                        .unix(time)
                                        .format('MM/DD/YYYY, HH:mmA')}
                                    </p>
                                    {/* <button
                                      onClick={() => this.buttonClick(time)}
                                    >
                                      vote
                                    </button> */}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                <p>---------------------</p>
                              </div>
                            )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
export default withRouter(AllTimes);
