import React from 'react';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  render() {
    return (
      <div>
        <p>Menu Test</p>
      </div>
    );
  }
}