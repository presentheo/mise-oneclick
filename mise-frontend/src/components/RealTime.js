import React, { Component } from 'react';
import styled from 'styled-components';
import {Col, Row} from 'react-styled-flexboxgrid';

const RealTimeData = styled.div`
  border-bottom: 1px solid #ddd;
`

// 평균값 구하기
const average = (arr, key) => {
  let sum = arr.reduce((acc, cur) => {
    if (cur[key] === '-'){
      cur[key] = 0;
    }
    console.log(cur[key])
    acc += cur[key]*1
    return acc;
  }, 0)
  return Math.floor(sum/arr.length)
}

class RealTime extends Component {
  constructor(props){
    super(props);
    this.state = {
      pm10: 10
    }
  }

  render() {

    const pm10Grade = (value) => {
      if (value >= 0 && value <= 30){
        return <span style={{"color":"blue"}}>좋음</span>
      }else if (value >= 31 && value <= 80){
        return <span style={{"color":"green"}}>보통</span>
      }else if (value >= 81 && value <= 100){
        return <span style={{"color":"gold"}}>나쁨 </span>
      }else if (value >= 101){
        return <span style={{"color":"red"}}>매우나쁨</span>
      }
    }

    const pm25Grade = (value) => {
      if (value >= 0 && value <= 15){
        return <span style={{"color":"blue"}}>좋음</span>
      }else if (value >= 16 && value <= 35){
        return <span style={{"color":"green"}}>보통</span>
      }else if (value >= 36 && value <= 75){
        return <span style={{"color":"gold"}}>나쁨 </span>
      }else if (value >= 76){
        return <span style={{"color":"red"}}>매우나쁨</span>
      }
    }

    return (
      <RealTimeData>
        <div>
          <h1>{`지금 ${this.props.cityName}의 대기상황은`}</h1>
          <h3>미세먼지 농도 : {average(this.props.data, 'pm10Value')} / {pm10Grade(average(this.props.data, 'pm10Value'))}</h3>
          <h3>초미세먼지 농도 : {average(this.props.data, 'pm25Value')} / {pm25Grade(average(this.props.data, 'pm25Value'))}</h3>
        </div>
        <div>
          {/* <h3>측정소별 데이터</h3>
          <Row>{this.props.data.map((e, i) => {
            return (
              <Col md={2} key={i}>
                <h3>{e.stationName}</h3>
                <p>미세먼지 농도: {e.pm10Value} / {pm10Grade(e.pm10Value)}</p>
                <p>초미세먼지 농도: {e.pm25Value} / {pm25Grade(e.pm25Value)}</p>
              </Col>
            )
          })}</Row> */}
        </div>
      </RealTimeData>
    );
  }
}

export default RealTime;