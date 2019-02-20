import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.ul`
  display: flex;
  flex-direction: row-reverse;
`
const Value = styled.li`
  width: 100%;
  padding: 0 2px;
  text-align: center;
`
const ValueTime = styled.h5`
  margin-top: 4px;
`
const ValueBarBg = styled.div`
  width: 100%;
  height: 220px;
  background-color: #fafafa;
  border-radius: 5px 5px 0 0;
  box-shadow: inset 2px 2px 4px rgba(0,0,0,0.1);
  position: relative;
`
const ValueBarFill = styled.div`
  width: 100%;
  height: ${props => (props.val*2/3) + '%'};
  max-height: 100%;
  min-height: 30px;
  background-color: ${
    props => {
      let value = props.val;
      if (value >= 0 && value <= 30){
        return 'royalblue'
      }else if (value >= 31 && value <= 80){
        return 'green'
      }else if (value >= 81 && value <= 150){
        return 'orange'
      }else if (value >= 151){
        return 'crimson'
      }
    }
  };
  position: absolute;
  bottom: 0;
  border-radius: 3px 3px 0 0;
`
const ValueBarValue = styled.p`
  margin-top: 8px;
  color: #fff;
`

class Chart extends Component {
  render() {
    return (
      <Container>
        {this.props.data.map((e,i) => {
          return (
            <Value key={i}>
              <ValueBarBg>
                <ValueBarFill val={e[this.props.city]}>
                  <ValueBarValue>{e[this.props.city]}</ValueBarValue>
                </ValueBarFill>
              </ValueBarBg>
              <ValueTime>{e['dataTime'].substr(5)}</ValueTime>
            </Value>
          )
        })}
      </Container>
    )
  }
}

export default Chart;