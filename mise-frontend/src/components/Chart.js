import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.ul`
  display: flex;
  padding: 20px;
`
const ValueBarBg = styled.div`
  width: 30px;
  height: 300px;
  background-color: #fafafa;
  position: relative;
`
const ValueBarFill = styled.div`
  width: 100%;
  height: ${props => props.val > 150 ? '100%' : props.val*2/3 + '%'};
  background-color: ${
    props => {
      let value = props.val;
      if (value >= 0 && value <= 30){
        return 'blue'
      }else if (value >= 31 && value <= 80){
        return 'green'
      }else if (value >= 81 && value <= 150){
        return 'gold'
      }else if (value >= 151){
        return 'red'
      }
    }
  };
  position: absolute;
  bottom: 0;

`

class Chart extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  render() {
    return (
      <Container>
        {this.props.data.map((e,i) => {
          return (
            <li key={i}>
              <h5>{e['dataTime'].substr(5)}</h5>
              <ValueBarBg>
                <ValueBarFill val={e['seoul']}/>
              </ValueBarBg>
              <p>{e['seoul']}</p>
            </li>
          )
        })}
      </Container>
    )
  }
}

export default Chart;