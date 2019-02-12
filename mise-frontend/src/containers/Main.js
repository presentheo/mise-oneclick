import React, { Component } from 'react';

class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      realtimeData: [],
      dailyData: [],
      hourlyData: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:3001/data/daily').then(res => res.json()).then(json => {this.setState({dailyData: json['list']})})
    fetch('http://localhost:3001/data/hourly').then(res => res.json()).then(json => {this.setState({hourlyData: json['list']})})
    fetch('http://localhost:3001/data/realtime').then(res => res.json()).then(json => {this.setState({realtimeData: json['list']})})
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Main;