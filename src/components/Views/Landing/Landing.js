import React from 'react';
import Button from '../../Simple/Button/Button';
import styles from './Landing.module.scss';

export default class Landing extends React.Component {
  render() {
    return (
      <div className={styles.component}>
        <h1 className={styles.title}>envite</h1>
        <h3 className={styles.subtitle}>Bringing Peple Together</h3>
        <Button>Primary</Button>
        <Button variant="primary">Secondary</Button>
        <a href="http://localhost:4000/auth/logout">Click to log out</a>
      </div>
    );
  }
}
