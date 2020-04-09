import React from 'react';
import Cal from '../../Simple/Cal/Cal';
//import MeetAt from '../../Simple/MeetAt/MeetAt';
import AppContext from '../../../context/app-context';
import styles from './Calendar.module.scss';
import TimePick from '../../Simple/TimePicker/TimePicker'

//button used for place holder

export default class Calendar extends React.Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {
            userDate: null
        }
    }

    componentDidMount() {
        console.log(this.context.userTimes);
    }

    render() {
        return(
            <div className={styles.calendarView}>
                <Cal />
                <div className={styles.meetingLength}>
                    <p>Meeting Length: {this.context.meetingLength}</p>
                </div>
                <div className={styles.meetAt}>
                    <p>You could meet at:</p>
                    <TimePick />
                </div>
                <button className='submitTime' type='submit'>Submit Times</button> 
            </div>
        )
    }
}