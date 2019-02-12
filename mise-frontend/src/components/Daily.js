import React, { Component } from 'react';
import Chart from './Chart';

const url = 'http://localhost:3001/data/daily';

class Daily extends Component {
  constructor(props){
    super(props);
    this.state = {
      dailyData: []
    }
  }

  componentDidMount(){
    fetch(url)
    .then(res => res.json())
    .then(json => {console.log(json); this.setState({dailyData: json['list']})})
  }

  render() {
    return (
      <div>
        <h2>일간 미세먼지 지수</h2>
        {/* <p>{this.state.dailyData[0]['seoul']}</p> */}
        <Chart data={this.state.dailyData}></Chart>
      </div>
    );
  }

}

export default Daily;