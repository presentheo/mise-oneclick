import React, { Component } from 'react';

const url = 'http://localhost:3001/data/daily';

class Daily extends Component {

  constructor(props){
    super(props);
    this.state = {
      dailyData: []
    }
  }

  componentDidMount(){
    fetch(url).then(res => res.json().then(json => {
      console.log(json);
      this.setState({dailyData: json['list']})
    }));
  }

  render() {
    return (
      <div>
        <h2>일간 미세먼지 지수</h2>
        <ul>
          {this.state.dailyData.map((e,i) => {
            return <li key={i}>{e['dataTime']} / {e['seoul']}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default Daily;