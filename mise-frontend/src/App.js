import React, { Component } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import { Normalize } from 'styled-normalize'
import Menu from './components/Menu';
import RealTime from './components/RealTime';
import Daily from './components/Daily';
import Hourly from './components/Hourly';
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
`

const Container = styled.div`
  display: flex;
`
class App extends Component {
  render() {
    return (
      <div className="App">
        <Normalize/>
        <GlobalStyle/>
        <h1>소희미세 리스펙 ^-^</h1>
        <Container>
          <Menu></Menu>
          <RealTime></RealTime>
          <div>
            <Daily></Daily>
            <Hourly></Hourly>
          </div>
        </Container>
        
      </div>
    );
  }
}

export default App;
