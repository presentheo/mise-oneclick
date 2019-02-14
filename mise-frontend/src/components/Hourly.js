import React, { Component } from 'react';
import Chart from './Chart'

class Hourly extends Component {

  render() {
    return (
      <div>
        <h2>시간별 미세먼지 지수</h2>
        <Chart 
          data={this.props.data}
          city={this.props.cityId}></Chart>
      </div>
    );
  }
}

export default Hourly;