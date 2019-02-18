import React, { Component } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import { Normalize } from 'styled-normalize';
import {Col, Row} from 'react-styled-flexboxgrid';
import Menu from './components/Menu';
import RealTime from './components/RealTime';
import Daily from './components/Daily';
import Hourly from './components/Hourly';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,400');
  body{font-family: 'Noto Sans KR', sans-serif;}
  h1,h2,h3,h4,h5{margin: 0; padding: 0;}
  p{margin: 0; padding:0;}
  ul{
    margin: 0;
    padding: 0;
    list-style: none;
  }
`
const Container = styled.div`
  display: flex;
`
const Content = styled.div`
  padding-left: 180px;
  position: relative;
  min-height: 300px;
  background: linear-gradient(270deg, skyblue, royalblue);
  /* background: ${
    props => {
      let grade = props.grade;
      if (grade === '좋음'){return 'linear-gradient(270deg, skyblue, royalblue)'}
      else if (grade === '보통'){return 'linear-gradient(270deg, limegreen, seagreen)'}
      else if (grade === '나쁨'){return 'linear-gradient(270deg, khaki, orange)'}
      else if (grade === '매우나쁨'){return 'linear-gradient(270deg, crimson, tomato)'}
    }
  }; */
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


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedCityId: 'seoul',
      selectedCityName: '서울',
      realtimeData: [],
      dailyData: [],
      hourlyData: []
    }
  }

  // 상태값 변경
  fetchRealtimeDatasToState = (cityName) => {
    fetch(`http://localhost:3001/realtime`)
    // fetch(`http://localhost:3001/realtime?city=${encodeURI(cityName)}`)
    .then(res => res.json())
    .then(json => {
      this.setState({realtimeData: json['records']})
    })
  }
  
  // 앱 구동시 초기값
  componentDidMount(){
    this.fetchRealtimeDatasToState(this.state.selectedCityName);

    fetch(`http://localhost:3001/hourly`)
    .then(res => res.text())
    .then(text => this.setState({hourlyData: JSON.parse(text)['records']}))
  
    fetch(`http://localhost:3001/daily`)
    .then(res => res.text())
    .then(text => this.setState({dailyData: JSON.parse(text)['records']}))
  }
  
  // 클릭시 변경
  handleClick = (id, name) => {
    this.setState({
      selectedCityId: id,
      selectedCityName: name
    });
    this.fetchRealtimeDatasToState(name);
  }
  
  render() {
    return (
      <div className="App">
        <Normalize/>
        <GlobalStyle/>
        {/* <h1>소희미세 리스펙 ^-^</h1> */}
        <Container>
          <Menu 
            data={this.state.hourlyData}
            onClickCity={this.handleClick}></Menu>
          <Content>
            <Row>
              <Col md={12}>
                <RealTime
                  data={this.state.realtimeData}
                  cityName={this.state.selectedCityName}></RealTime>
              </Col>
              <Col md={6}>
                <Daily 
                  data={this.state.dailyData}
                  cityId={this.state.selectedCityId}></Daily>
              </Col>
              <Col md={6}>
                <Hourly
                  data={this.state.hourlyData}
                  cityId={this.state.selectedCityId}></Hourly>
              </Col>
            </Row>
          </Content>
        </Container>
        
      </div>
    );
  }
}

export default App;
