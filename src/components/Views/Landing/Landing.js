import React from 'react';
import Button from '../../Simple/Button/Button';
import styles from './Landing.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
    this.state = {
      loginButton: false
    };
  }

  buttonClick() {
    this.setState({ loginButton: true });
  }

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
          {this.state.loginButton === false ? (
            <Button onClick={this.buttonClick}>start meeting people</Button>
          ) : (
            <div className="login-container">
              <a
                href="http://localhost:4000/auth/facebook"
                className="loginBtn loginBtn--facebook"
              >
                Login with Facebook
              </a>

              <a
                href="http://localhost:4000/auth/google"
                className="loginBtn loginBtn--google"
              >
                Login with Google
              </a>
            </div>
          )}
        </div>
        {/* <a href="http://localhost:4000/auth/logout">Click to log out</a> */}
      </div>
    );
  }
}
