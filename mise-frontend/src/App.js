import React, { Component } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import { Normalize } from 'styled-normalize';
import {Col, Row} from 'react-styled-flexboxgrid';
import Menu from './components/Menu';
import RealTime from './components/RealTime';
import Chart from './components/Chart';

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
  .weak{font-weight: 100;}
  .badge{
    background-color: blue;
    padding: 2px 7px;
    border-radius: 3px;
    font-size: 12px;
    color: #fff;
  }
`
const Container = styled.div`
  display: flex;
  background-image: linear-gradient(270deg, crimson, tomato);
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
const Content = styled.div`
  /* margin-left: 180px; */
  padding: 30px 30px 180px;
  position: relative;
  background-image: url('http://localhost:3000/images/city.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-attachment: fixed;
  background-position: bottom;
`
const ContentTitle = styled.h1`
  letter-spacing: -7px;
  font-size: 5em;
  color: #fff;
`
const Card = styled.div`
  background-color: rgba(255,255,255,1);
  border-radius: 12px;
  box-shadow: 2px 3px 4px rgba(0,0,0,0.2);
  padding: 20px;
  margin-top: 20px;
`
const CardTitle = styled.h2`
  margin-bottom: 20px;
  color: #444;
`
const TableWrapper = styled.div`
  max-height: 800px;
  overflow: auto;
`
const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`
const TableRow = styled.tr`
  & td, th{
    padding: 8px 4px;
    border-top: 1px solid #ddd;
    text-align: left;
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
          {/* <Menu 
            data={this.state.hourlyData}
            onClickCity={this.handleClick}></Menu> */}
          <Content>
            <ContentTitle>
              <p>
                <span className="weak">지금 </span>
                {this.state.selectedCityName}
                <span className="weak">의 </span>
              </p>
              <p>
                미세먼지 농도
                <span className="weak">는</span>
              </p>
              <p>
                "매우나쁨" <span className="weak">상태입니다.</span>
              </p>
            </ContentTitle>
            <RealTime
              data={this.state.realtimeData}
              cityName={this.state.selectedCityName}></RealTime>
            <Row>
              <Col lg={8}>
                <Card>
                  <CardTitle>시간별 미세먼지 농도</CardTitle>
                  <Chart
                    data={this.state.hourlyData}
                    city={this.state.selectedCityId}></Chart>
                </Card>
                <Card>
                  <CardTitle>일간 미세먼지 농도</CardTitle>
                  <Chart
                    data={this.state.dailyData}
                    city={this.state.selectedCityId}></Chart>
                </Card>
              </Col>
              <Col lg={4}>
                <Card>
                  <CardTitle>측정소별 미세먼지 농도</CardTitle>
                  <TableWrapper>
                    <Table>
                      <TableRow>
                        <th>측정소</th>
                        <th>농도</th>
                        <th>등급</th>
                      </TableRow>
                    {this.state.realtimeData.map((e, i) => {
                      return (
                        <TableRow key={i}>
                          <td>{e.stationName}</td>
                          <td>{e.pm10Value}</td>
                          <td>
                            <span className="badge">좋음</span>
                          </td>
                        </TableRow>
                      )
                    })}</Table>
                  </TableWrapper>
                </Card>
              </Col>
            </Row>
          </Content>
        </Container>
        
      </div>
    );
  }
}

export default App;
