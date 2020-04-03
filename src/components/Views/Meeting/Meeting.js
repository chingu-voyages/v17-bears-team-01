import React from 'react';

export default class Meeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        console.log("test")
    }

    render() {
        return (
            <div>
                <p>test</p>
            </div>
        )
    }
}