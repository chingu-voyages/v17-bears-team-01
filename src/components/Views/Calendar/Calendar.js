import React from 'react';
import Cal from '../../Simple/Cal/Cal';

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log("test cal");
    }

    render() {
        return(
            <div>
                <Cal />
            </div>
        )
    }
}