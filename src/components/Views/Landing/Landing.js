import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Simple/Button/Button';
import styles from './Landing.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export default class Landing extends React.Component {
  render() {
    return (
      <div className={styles.component}>
        <div className={styles.title}>
          <div className={styles.iconBackground}>
            <FontAwesomeIcon className={styles.icon} icon={faCalendarAlt} />
          </div>
          <h1>envite</h1>
        </div>
        <h3 className={styles.subtitle}>Bringing Peple Together</h3>
        <div className={styles.buttons}>
          <Link to="/login">
            <Button>start meeting people</Button>
          </Link>
          <p>have an account?</p>
          <Link to="/login">
            <p>sign in</p>
          </Link>
        </div>
        {/* <a href="http://localhost:4000/auth/logout">Click to log out</a> */}
      </div>
    );
  }
}
