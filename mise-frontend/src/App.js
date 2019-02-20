import React, { Component } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import { Normalize } from 'styled-normalize';
import {Col, Row} from 'react-styled-flexboxgrid';
import Menu from './components/Menu';
import RealTime from './components/RealTime';
import Chart from './components/Chart';
import { getAverage, getPm10Grade } from './utils';

const cityList = [
  {id: 'seoul', name: '서울'},
  {id: 'busan', name: '부산'},
  {id: 'daegu', name: '대구'},
  {id: 'incheon', name: '인천'},
  {id: 'gwangju', name: '광주'},
  {id: 'daejeon', name: '대전'},
  {id: 'ulsan', name: '울산'},
  {id: 'gyeonggi', name: '경기'},
  {id: 'gangwon', name: '강원'},
  {id: 'chungbuk', name: '충북'},
  {id: 'chungnam', name: '충남'},
  {id: 'jeonbuk', name: '전북'},
  {id: 'jeonnam', name: '전남'},
  {id: 'gyeongbuk', name: '경북'},
  {id: 'gyeongnam', name: '경남'},
  {id: 'jeju', name: '제주'},
  {id: 'sejong', name: '세종'}
]

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
`
export const Badge = styled.span`
  background-color: ${
    props => {
      let grade = props.grade;
      if (grade === '좋음'){return 'blue'}
      else if (grade === '보통'){return 'seagreen'}
      else if (grade === '나쁨'){return 'orange'}
      else if (grade === '매우나쁨'){return 'crimson'}
    }
  };
  padding: 2px 7px;
  border-radius: 3px;
  font-size: 12px;
  color: #fff;
`
const Container = styled.div`
  display: flex;
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
const Content = styled.div`
  margin-left: 180px;
  padding: 30px 40px 180px;
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
    font-size: 14px;
  }
`
const Progress = styled.div`
`
const ProgressBg = styled.div`
  height: 20px;
  background-color: #fafafa;
  border-radius: 5px;
  box-shadow: inset 2px 2px 4px rgba(0,0,0,0.1);
  display: flex;
  overflow: hidden;
`
const ProgressBar = styled.div`
  height: 100%;
  &:nth-of-type(1){
    width: 20%;
    background-color: blue;
  }
  &:nth-of-type(2){
    width: 34%;
    background-color: green;
  }
  &:nth-of-type(3){
    width: 14%;
    background-color: orange;
  }
  &:nth-of-type(4){
    width: 34%;
    background-color: crimson;
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
    .then(res => res.json())
    .then(json => {
      this.setState({hourlyData: json['list']});
    })
    
    fetch(`http://localhost:3001/daily`)
    .then(res => res.json())
    .then(json => this.setState({dailyData: json['list']}))
  }

  getCityData = (obj, value) => {
    for (let key in obj){
      if (key === value){
        return obj[key]
      }
    }
  }

  getCityDataList = () => {
    const cityData = cityList.reduce((acc, cur) => {
      acc.push({
        ...cur, 
        pm10: this.getCityData(this.state.hourlyData[0], cur.id)
      })
      return acc;
    }, [])
    return cityData;
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
        <Container grade={getPm10Grade(this.getCityData(this.state.hourlyData[0], this.state.selectedCityId))}>
          <Menu 
            data={this.getCityDataList()}
            onClickCity={this.handleClick}></Menu>
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
                "{getPm10Grade(this.getCityData(this.state.hourlyData[0], this.state.selectedCityId))}" <span className="weak">상태입니다.</span>
              </p>
            </ContentTitle>
            <RealTime
              data={this.state.realtimeData}
              cityName={this.state.selectedCityName}></RealTime>
            <Row>
              <Col md={12}>
                <Card>
                  <Progress>
                    <ProgressBg>
                      <ProgressBar></ProgressBar>
                      <ProgressBar></ProgressBar>
                      <ProgressBar></ProgressBar>
                      <ProgressBar></ProgressBar>
                    </ProgressBg>
                  </Progress>
                  (02-20 10:00 기준, 서울 측정소 평균)
                </Card>
              </Col>
              <Col lg={7}>
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
              <Col lg={5}>
                <Card>
                  <CardTitle>측정소별 미세먼지 농도</CardTitle>
                  <TableWrapper>
                    <Table>
                      <tbody>
                      <TableRow>
                        <th>측정소</th>
                        <th>PM10농도</th>
                        <th>PM2.5농도</th>
                        <th>등급</th>
                      </TableRow>
                    {this.state.realtimeData.map((e, i) => {
                      return (
                        <TableRow key={i}>
                          <td>{e.stationName}</td>
                          <td>{e.pm10Value}</td>
                          <td>{e.pm25Value}</td>
                          <td>
                            <Badge grade={getPm10Grade(e.pm10Value)}>{getPm10Grade(e.pm10Value)}</Badge>
                          </td>
                        </TableRow>
                      )
                    })}</tbody></Table>
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
