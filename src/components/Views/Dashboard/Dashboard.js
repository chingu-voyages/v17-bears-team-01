import React from 'react';
import styles from './Dashboard.module.scss';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Query } from '@apollo/react-components';

const GET_MEETINGS = gql`
    {
        getMeetings{
            id
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


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            availableMeetings: ['tuesday', 'wednsday', 'thursday'],
            meetings: {}
        }
    }


    componentDidMount() {

    }

    render() {
        return (
            <div className={styles.component}>
                {this.state.availableMeetings.length === 0 
                    ? <div>
                        <p>Hmm I don't see any meetings here...</p>
                        <Link to="/create">
                            <button>Create Meeting</button>
                        </Link>
                    </div>
                    : <div>
                        <h2>Your Meetings</h2>
                        <ul>
                            {this.state.availableMeetings.map(meeting => <li key={meeting}><Link>{meeting}</Link></li>)}
                        </ul>
                        <div>
                            <Query query={GET_MEETINGS}>
                            {({ loading, error, data }) => {
                                if (loading) return "Loading...";
                                if (error) return (
                                    <div>
                                        <p>Hmm I don't see any meetings here...</p>
                                        <Link to="/create">
                                            <button>Create Meeting</button>
                                        </Link>
                                    </div>
                                );
                                //PRINT MEETING DATA
                                console.log(data);
                                return(
                                    <ul>
                                        {data.getMeetings.map(meeting => (
                                            <li key={meeting.id}>
                                                <p>{meeting.title}</p>
                                                <p>{meeting.duration}</p>
                                                <p>{meeting.availability[0]}</p>
                                            </li>
                                        ))}
                                    </ul>
                                );
                            }}
                            </Query>
                        </div>
                    </div>
                }
            </div>
        )
    }
}