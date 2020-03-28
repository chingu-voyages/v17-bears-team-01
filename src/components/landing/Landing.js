import React from 'react';

export default class Landing extends React.Component {

  componentDidMount() {
    const value = this.context;
    console.log(value);
    /* wykonaj akcję podczas montowania z użyciem aktualnej wartości z MyContext */
  }

  render() {
    console.log(this.value);
    return (
      <div>
        <p>Landing Test</p>
      </div>
    );
  }
}