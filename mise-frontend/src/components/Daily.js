import React, { Component } from 'react';
import Chart from './Chart';
import styled from 'styled-components';

class Daily extends Component {
  render() {
    return (
        <Chart 
          data={this.props.data} 
          city={this.props.cityId}></Chart>
    );
  }

}

export default Daily;