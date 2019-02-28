import React, { Component } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import { Normalize } from 'styled-normalize';
import {Col, Row} from 'react-styled-flexboxgrid';
import Menu from './components/Menu';
import Chart from './components/Chart';
import Loading from './components/Loading';
import { getPm25Grade } from './utils';

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
  div{box-sizing: border-box}

  body::-webkit-scrollbar {
    width: 8px;
  }
  body::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }
 
  body::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 5px;
  }
`
export const Badge = styled.span`
  background-color: ${
    props => {
      let grade = props.grade;
      if (grade === '좋음'){return 'blue'}
      else if (grade === '보통'){return 'seagreen'}
      else if (grade === '나쁨'){return 'orange'}
      else if (grade === '매우나쁨'){return 'crimson'}
      else if (grade === '정보없음'){return 'gray'}
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
      else if (grade === '정보없음'){return 'linear-gradient(270deg, black, gray)'}
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
  max-width: 1800px;
  margin: auto;
  width: 100%;
  padding: 30px 40px 180px;
  position: relative;
  @media (max-width: 768px){
    margin: 0;
    padding: 20px 20px 180px;
  }
`
const ContentBg = styled.div`
  width: 100%;
  background-image: url('https://presentheo.github.io/projects/mise-oneclick/images/city.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-attachment: fixed;
  background-position: bottom;
`
const ContentTitle = styled.h1`
  letter-spacing: -7px;
  font-size: 5em;
  color: #fff;
  @media (max-width: 768px){
    font-size: 2.3em;
    letter-spacing: -3px;
  }
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
  @media (max-width: 768px){
    font-size: 20px;
  }
`
const TableWrapper = styled.div`
  max-height: 600px;
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
const Button = styled.button`
  width: auto;
  padding: 12px 20px;
  background-color: #fff;
  border: 0;
  border-radius: 5px 0 0 5px;
  position: absolute;
  top: 30px;
  right : 0px;
  box-shadow: 0 0 8px rgba(0,0,0,0.3);
  cursor: pointer;
  font-weight: 800;
  color: #444;
  transition: padding-right 0.2s ease;
  &:hover{
    padding-right: 30px;
  }
  &>span{
    display: inline-block;
    vertical-align: middle;
  }
  &>img{
    display: inline-block;
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin-right: 4px;
  }
  @media (max-width: 768px){
    top: 10px;
    padding: 8px 16px;
    font-size: 12px;
  }
`

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      fetchInProgress: true,
      menuIsOpen: false,
      selectedCityId: 'seoul',
      selectedCityName: '서울',
      realtimeData: [],
      dailyData: [],
      hourlyData: []
    }
  }

  // 상태값 변경
  fetchRealtimeDatasToState = (cityName) => {
    fetch(`https://miseoneclick.herokuapp.com/realtime?city=${encodeURI(cityName)}`)
    .then(res => res.json())
    .then(json => {
      this.setState({realtimeData: json['list']})
      this.setState({fetchInProgress: false})
    })
  }
  
  // 앱 구동시 초기값
  componentDidMount(){
    this.fetchRealtimeDatasToState(this.state.selectedCityName);

    fetch(`https://miseoneclick.herokuapp.com/hourly`)
    .then(res => res.json())
    .then(json => this.setState({hourlyData: json['list']}))
    
    fetch(`https://miseoneclick.herokuapp.com/daily`)
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
        pm25: this.getCityData(this.state.hourlyData[0], cur.id)
      })
      return acc;
    }, [])
    return cityData;
  }
  
  // 클릭시 변경
  handleClick = (id, name) => {
    this.setState({
      fetchInProgress: true,
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
        {this.state.fetchInProgress ? <Loading/> : ''}
        <Container grade={getPm25Grade(this.getCityData(this.state.hourlyData[0], this.state.selectedCityId))}>
          <Menu
            onCloseMenu={() => this.setState({menuIsOpen: false})}
            open={this.state.menuIsOpen}
            data={this.getCityDataList()}
            onClickCity={this.handleClick}></Menu>
          <Button onClick={() => this.setState({menuIsOpen: !this.state.menuIsOpen})}>
            <img src="https://presentheo.github.io/projects/mise-oneclick/images/menu.svg" alt="left arrow"></img><span> 다른 지역 확인</span>
          </Button>
          <ContentBg>
            <Content>
              <ContentTitle>
                <p>
                  <span className="weak">지금 </span>
                  {this.state.selectedCityName}
                  <span className="weak">의 </span>
                </p>
                <p>
                  미세먼지
                  <span className="weak"> 농도는</span>
                </p>
                <p>
                  "{getPm25Grade(this.getCityData(this.state.hourlyData[0], this.state.selectedCityId))}" <span className="weak">상태입니다.</span>
                </p>
              </ContentTitle>
              <p style={{color: '#fff', fontSize: '16px', marginTop: '14px'}}>
                ({this.state.hourlyData[0] ? this.state.hourlyData[0].dataTime : '0000-00-00 00:00'} 기준, {this.state.selectedCityName} 측정소 평균)
              </p>
              <Row>
                <Col md={7} xs={12}>
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
                <Col md={5} xs={12}>
                  <Card>
                    <CardTitle>측정소별 미세먼지 농도</CardTitle>
                    <TableWrapper>
                      <Table>
                        <tbody>
                        <TableRow>
                          <th>측정소</th>
                          <th>농도(㎍/m³)</th>
                          <th>등급</th>
                        </TableRow>
                      {this.state.realtimeData.map((e, i) => {
                        return (
                          <TableRow key={i}>
                            <td>{e.stationName}</td>
                            <td>{e.pm25Value}</td>
                            <td>
                              <Badge grade={getPm25Grade(e.pm25Value)}>{getPm25Grade(e.pm25Value)}</Badge>
                            </td>
                          </TableRow>
                        )
                      })}</tbody></Table>
                    </TableWrapper>
                  </Card>
                </Col>
              </Row>
            </Content>
          </ContentBg>
        </Container>
        
      </div>
    );
  }
}

export default App;
