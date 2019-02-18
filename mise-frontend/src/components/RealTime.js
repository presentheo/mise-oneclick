import React, { Component } from 'react';
import styled from 'styled-components';
import {Col, Row} from 'react-styled-flexboxgrid';

// 스타일
const RealTimeData = styled.div`
  /* border-bottom: 1px solid #ddd; */
`
const Weak = styled.span`
  font-weight: 100;
`
const Visual = styled.div`
  padding: 30px;
  position: relative;
  height: 20vh;
  min-height: 300px;
  background: ${
    props => {
      let grade = props.grade;
      if (grade === '좋음'){return 'linear-gradient(270deg, skyblue, royalblue)'}
      else if (grade === '보통'){return 'linear-gradient(270deg, limegreen, seagreen)'}
      else if (grade === '나쁨'){return 'linear-gradient(270deg, khaki, orange)'}
      else if (grade === '매우나쁨'){return 'linear-gradient(270deg, crimson, tomato)'}
    }
  };
  background-size: 400% 400%;
  -webkit-animation: animatedGradient 10s ease infinite;
  -moz-animation: animatedGradient 10s ease infinite;
  animation: animatedGradient 10s ease infinite;

  @-webkit-keyframes animatedGradient {
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
  }
  @-moz-keyframes animatedGradient {
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
  }
  @keyframes animatedGradient { 
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
  }
`
const VisualTitle = styled.h1`
  letter-spacing: -10px;
  font-size: 5rem;
  color: #fff;
`
const InfoTable = styled.ul`
  background-color: rgba(255,255,255, 1);
  border-radius: 5px;
  padding: 20px;
  margin-top: 30px;
  /* color: #fff; */
`
const InfoKey = styled.h4`
  text-align: center;
  color: #aaa;
`
const InfoValue = styled.p`
  text-align: center;
  font-size: 42px;
`

const VisualIllust = styled.img`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: -1px;
`

// 미세먼지 등급별 컬러 세트
// const gradeData = {
//   good : {grade: '좋음', color: 'blue', gradientColor: 'skyblue, royalblue'},
//   normal : {grade: '보통', color: 'green', gradientColor: 'limegreen, seagreen'},
//   bad : {grade: '나쁨', color: 'gold', gradientColor: 'khaki, orange'},
//   worst : {grade: '매우나쁨', color: 'red', gradientColor: 'crimson, tomato'}
// }

class RealTime extends Component {

  // 평균값 구하기
  average = (arr, key) => {
    let result = arr.reduce((acc, cur) => {
      if (cur[key] === '-'){
        cur[key] = 0;
      }
      acc += cur[key]*1
      return acc
    }, 0)
    result = Math.floor(result/arr.length);
    return result
  }

  // 미세먼지 등급 구하기
  pm10Grade = () => {
    let value = this.average(this.props.data, 'pm10Value')
    if (value >= 0 && value <= 30){
      return '좋음'
    }else if (value >= 31 && value <= 80){
      return '보통'
    }else if (value >= 81 && value <= 100){
      return '나쁨'
    }else if (value >= 101){
      return '매우나쁨'
    }
  }
  
  render() {
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
        <Visual grade={this.pm10Grade()}>
          <VisualTitle>
            <Weak>지금 </Weak>{this.props.cityName}<Weak>의 --------------- 하늘은</Weak>
          </VisualTitle>
          <InfoTable>
            <Row>
              <Col>
                <InfoKey>미세먼지 농도</InfoKey>
                <InfoValue>30</InfoValue>
              </Col>
              <Col>
                <InfoKey>초미세먼지 농도</InfoKey>
                <InfoValue>40</InfoValue>
              </Col>
            </Row>
          </InfoTable>
          <VisualIllust src="http://localhost:3000/images/city.svg" alt="city illust"></VisualIllust>
        </Visual>
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