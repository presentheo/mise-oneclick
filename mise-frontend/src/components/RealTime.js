import React, { Component } from 'react';
import styled from 'styled-components';

const url = 'http://localhost:3001/data/realtime'

const RealTimeData = styled.div`
  border: 1px solid #ddd;
`

class RealTime extends Component {
  constructor(props){
    super(props);
    this.state = {
      pm10: 10
    }
  }

  componentDidMount(){
    fetch(url).then(res => res.json().then(json => {
      console.log(json);
      this.setState({pm10: json['list'][0]['seoul']})
    }));
  }

  render() {

    // const pm10Grade = (value) => {
    //   if (value >= 0 && value <= 30){
    //     return <span style={{"color":"blue"}}>좋음</span>
    //   }else if (value >= 31 && value <= 80){
    //     return <span style={{"color":"green"}}>보통</span>
    //   }else if (value >= 81 && value <= 100){
    //     return <span style={{"color":"gold"}}>나쁨 </span>
    //   }else if (value >= 101){
    //     return <span style={{"color":"red"}}>매우나쁨</span>
    //   }
    // }

    // const pm25Grade = (value) => {
    //   if (value >= 0 && value <= 15){
    //     return <span style={{"color":"blue"}}>좋음</span>
    //   }else if (value >= 16 && value <= 35){
    //     return <span style={{"color":"green"}}>보통</span>
    //   }else if (value >= 36 && value <= 75){
    //     return <span style={{"color":"gold"}}>나쁨 </span>
    //   }else if (value >= 76){
    //     return <span style={{"color":"red"}}>매우나쁨</span>
    //   }
    // }

    return (
      <RealTimeData>
        <div>
          <h1>서울</h1>
          <p>미세먼지 농도 : {this.state.pm10}</p>
          {/* <ul>{this.state.data.map(e => {
            return (
              <li>
                <h3>{e.stationName}</h3>
                <p>{e.dataTime} 기준</p>
                <p>미세먼지 농도: {e.pm10Value} / {pm10Grade(e.pm10Value)}</p>
                <p>초미세먼지 농도: {e.pm25Value} / {pm25Grade(e.pm25Value)}</p>
              </li>
            )
          })}</ul> */}
        </div>
        <div>
          <h3>측정소별 데이터</h3>
        </div>
      </RealTimeData>
    );
  }
}

export default RealTime;