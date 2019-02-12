import React, { Component } from 'react';
import Chart from './Chart'

const url = 'http://localhost:3001/data/hourly';

class Hourly extends Component {

  constructor(props){
    super(props);
    this.state = {
      hourlyData: []
    }
  }

  componentDidMount(){
    fetch(url).then(res => res.json().then(json => {
      console.log(json);
      this.setState({hourlyData: json['list']})
    }));
  }

  render() {
    return (
      <div>
        <h2>시간별 미세먼지 지수</h2>
        <Chart data={this.state.hourlyData}></Chart>
        
      </div>
    );
  }
}

export default Hourly;