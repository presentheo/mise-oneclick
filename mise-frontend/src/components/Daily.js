import React, { Component } from 'react';
import Chart from './Chart';
import styled from 'styled-components';

const Block = styled.div`
  border-right: 1px solid #ddd;
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
        <BlockTitle>일간 미세먼지 농도</BlockTitle>
        {/* <p>{this.state.dailyData[0]['seoul']}</p> */}
        
        <Chart 
          data={this.props.data} 
          city={this.props.cityId}></Chart>
      </Block>
    );
  }

}

export default Daily;