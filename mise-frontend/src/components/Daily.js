import React, { Component } from 'react';
import Chart from './Chart';

class Daily extends Component {
  render() {
    return (
      <div>
        <h2>일간 미세먼지 지수</h2>
        {/* <p>{this.state.dailyData[0]['seoul']}</p> */}
        <Chart data={this.props.data}></Chart>
      </div>
    );
  }

}

export default Daily;