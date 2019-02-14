import React, { Component } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import { Normalize } from 'styled-normalize';
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
  padding-left: 200px;
`

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedCity: '서울',
      realtimeData: [],
      dailyData: [],
      hourlyData: []
    }
  }

  // 상태값 변경
  fetchDatasToState = (city) => {
    fetch(`http://localhost:3001/realtime?city=${encodeURI(city)}`)
    .then(res => res.text())
    .then(text => console.log(JSON.parse(text)))
    // .then(text => this.setState({realtimeData: JSON.parse(text)['list']}))

    fetch(`http://localhost:3001/hourly`)
    .then(res => res.text())
    .then(text => console.log(text))
    // .then(text => this.setState({hourlyData: JSON.parse(text)['list']}))

    fetch(`http://localhost:3001/daily`)
    .then(res => res.text())
    .then(text => console.log(text))
    // .then(text => this.setState({dailyData: JSON.parse(text)['list']}))
  }
  
  // 앱 구동시 초기값
  componentDidMount(){
    this.fetchDatasToState(this.state.selectedCity);
  }

  // 클릭시 변경
  handleClick = (city) => {
    this.setState({selectedCity: city});
    this.fetchDatasToState(this.state.selectedCity);
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
            onClickSido={this.handleClick}></Menu>
          <RealTime data={this.state.realtimeData}></RealTime>
          <div>
            <Daily 
              data={this.state.dailyData}
              city={this.state.selectedCity}></Daily>
            <Hourly
              data={this.state.hourlyData}
              city={this.state.selectedCity}></Hourly>
          </div>
        </Container>
        
      </div>
    );
  }
}

export default App;
