import React from 'react';
import styles from './Dashboard.module.scss';
import Button from '../../Simple/Button/Button';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_MEETINGS = gql`
  {
    getMeetings {
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

function Dashboard() {
  const { loading, error, data } = useQuery(GET_MEETINGS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className={styles.component}>
      <h1>Dashboard</h1>
      <div className={styles.buttons}>
        <Link to="/create">
          <Button>Create</Button>
        </Link>
        <Link to="/join">
          <Button>Join</Button>
        </Link>
        <a href="http://localhost:4000/auth/logout">
          <Button>Log out</Button>
        </a>
      </div>
      {data.getMeetings.length ? (
        <ul className={styles.meeting}>
          <h2>Your meetings</h2>
          {data.getMeetings.map((meeting) => (
            <li key={meeting.id} value={meeting.id}>
              <Link to={`/alltimes/${meeting.id}`}>{meeting.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.meetings}>
          You have no meetings. You can create one using button CREATE above
        </p>
      )}
    </div>
  );
}

export default Dashboard;
