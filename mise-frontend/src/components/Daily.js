import React, { Component } from 'react';
import Chart from './Chart';
import styled from 'styled-components';

const Block = styled.div`
  border-radius: 12px;
  box-shadow: 1px 2px 6px rgba(0,0,0,0.1);
  padding: 20px;
`
const BlockTitle = styled.h2`
  margin-bottom: 20px;
  color: #444;
`

class Daily extends Component {
  render() {
    return (
      <Block>
        <BlockTitle>일간 미세먼지 지수</BlockTitle>
        {/* <p>{this.state.dailyData[0]['seoul']}</p> */}
        
        <Chart 
          data={this.props.data} 
          city={this.props.cityId}></Chart>
      </Block>
    );
  }

}

export default Daily;