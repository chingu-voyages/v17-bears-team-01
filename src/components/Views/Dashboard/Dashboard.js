import React from 'react';
import styles from './Dashboard.module.scss';
import { Link } from 'react-router-dom';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';

const GET_MEETINGS = gql`
    {
        getMeetings{
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
    getMeetings = () => {
        return(
        <Query query={GET_MEETINGS}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                    this.setState({
                        meetings: data
                    });
                }}
        </Query>
        );
    };

    componentDidMount() {
        this.getMeetings();
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
                    </div>
                }
            </div>
        )
    }
}