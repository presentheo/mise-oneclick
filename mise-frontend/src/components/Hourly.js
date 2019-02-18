import React, { Component } from 'react';
import Chart from './Chart'
import styled from 'styled-components';

const Block = styled.div`
  border-right: 1px solid #ddd;
  padding: 20px;
`
const BlockTitle = styled.h2`
  margin-bottom: 20px;
  color: #444;
`

class Hourly extends Component {
  render() {
    return (
      <Block>
        <BlockTitle>시간별 미세먼지 농도</BlockTitle>
        <Chart 
          data={this.props.data}
          city={this.props.cityId}></Chart>
      </Block>
    );
  }
}

export default Hourly;