import React from 'react';
import styles from './AllTimes.module.scss';
import AppContext from '../../../context/app-context';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';

const GET_USERS_AND_MEETING = gql`
    query($id: String!){
        getUsers(id: $id){
            id
            email
            name
        }
        getMeeting(id: $id){
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

export default class AllTimes extends React.Component {
    static contextType = AppContext;
    constructor(props) {
      super(props);
      this.state = {
        users: {
          'participants': [
            {
              'user_id': 'zach',
              'intervals': [
                123123,
                123124,
                123125,
                123126
              ]
            },
            {
              'user_id': 'deep',
              'intervals': [
                123123,
                123124,
                123125,
                123126
              ]
            },
            {
              'user_id': 'piotr',
              'intervals': [
                123123,
                123124,
                123125,
                123126
              ]
            },
            {
              'user_id': 'yuting',
              'intervals': [
                123123,
                123199,
                123125,
                123126
              ]
            }      
          ]
        },
        vote: null,
        voted: false 
      };
    }

    buttonClick(time) {
      this.setState({ 
        vote: time ,
        voted: true
      });
      console.log(this.state.vote);
    }

    componentDidMount() {
      console.log('test', this.state.users.participants);
    }

    render() {
      return (
        <div className={styles.timesContainer}>
          <header>
            <h2>calendar name</h2>
            <div className={styles.meetingInfo}>
              <p>organizer: </p>
              <p>contact: </p>
            </div>
            <h3>requiered time:{this.context.meetingLength}</h3>
          </header>
                
          <div>
            {this.state.users.participants.map(user => 
              <div>
                <h3>{user.user_id}</h3>
                <div>{user.intervals.map((time) => 
                  <div className={styles.timeInfo} >
                    <p>{time}</p>
                    <button onClick={e => this.buttonClick(time)}>vote</button>
                  </div>
                )}</div>
              </div>
            )}
          </div>
        </div>
      );
    }
}