import React from 'react';
import styles from './Dashboard.module.scss';
import Button from '../../Simple/Button/Button';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_MEETINGS = gql`
  {
    getMeetings {
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

function Dashboard() {
  const { loading, error, data } = useQuery(GET_MEETINGS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className={styles.component}>
      <h1>Dashboard</h1>
      <Link to="/create">
        <Button>Create Meeting</Button>
      </Link>
      {data.getMeetings.length ? (
        <ul name="meetings">
          {data.getMeetings.map((meeting) => (
            <li key={meeting._id} value={meeting._id}>
              {meeting.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>
          You have no meetings. You can create one using button CREATE MEETING
          above
        </p>
      )}
    </div>
  );
}

export default Dashboard;
