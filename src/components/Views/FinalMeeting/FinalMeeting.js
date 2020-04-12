import React from 'react';
import styles from './FinalMeeting.module.scss';

export default class FinalMeeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log('fetch final meeting');
    }

    render() {
        return (
            <div className={styles.finalContainer}>
                <p>test</p>
            </div>
        )
    }
}