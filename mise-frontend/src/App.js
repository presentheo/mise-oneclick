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
      // selectedSido: '',
      realtimeData: [],
      dailyData: [],
      hourlyData: []
    }
  }

  // 상태값 변경
  fetchDatasToState = () => {
    fetch(`http://localhost:3001/data/daily`).then(res => res.json()).then(json => this.setState({
      dailyData: json['list']
    }))
    fetch(`http://localhost:3001/data/hourly`).then(res => res.json()).then(json => this.setState({
      hourlyData: json['list']
    }))
    fetch(`http://localhost:3001/data/realtime`).then(res => res.json()).then(json => this.setState({
      realtimeData: json['list']
    }))
  }
  
  // 앱 구동시 초기값
  componentDidMount(){
    this.fetchDatasToState();
  }

  // componentWillUpdate(){
  //   this.fetchDatasToState(this.state.selectedSido);
  // }

  // 클릭시 변경
  handleClick = (sido) => {
    this.setState({selectedSido: sido})
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
            <Daily data={this.state.dailyData}></Daily>
            <Hourly data={this.state.hourlyData}></Hourly>
          </div>
        </Container>
        
      </div>
    );
  }
}

export default App;
