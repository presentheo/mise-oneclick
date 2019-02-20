import React, { Component } from 'react';
import Chart from './Chart'

class Hourly extends Component {
  render() {
    return (
      <Chart 
        data={this.props.data}
        city={this.props.cityId}></Chart>
    );
  }
}

export default Hourly;