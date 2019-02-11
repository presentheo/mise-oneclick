import React, { Component } from 'react';
import styled from 'styled-components';

const url = 'http://localhost:3001/data/realtime';

const MenuList = styled.ul`
  border: 1px solid #ddd;
`
const MenuItem = styled.li`
  background-color: #fff;
  padding: 12px;
`
const MenuItemTitle = styled.h4`
  margin: 0;
  padding: 0;
`

class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount(){
    fetch(url).then(res => res.json().then(json => {
      console.log(json);
      this.setState({data: json['list'][0]})
    }));
  }
  
  
  render() {

    const sidoList = [
      {name: '서울', pm10: this.state.data['seoul']},
      {name: '부산', pm10: this.state.data['busan']},
      {name: '대구', pm10: this.state.data['daegu']},
      {name: '인천', pm10: this.state.data['incheon']},
      {name: '광주', pm10: this.state.data['gwangju']},
      {name: '대전', pm10: this.state.data['daejeon']},
      {name: '울산', pm10: this.state.data['ulsan']},
      {name: '경기', pm10: this.state.data['gyeonggi']},
      {name: '강원', pm10: this.state.data['gangwon']},
      {name: '충북', pm10: this.state.data['chungbuk']},
      {name: '충남', pm10: this.state.data['chungnam']},
      {name: '전북', pm10: this.state.data['jeonbuk']},
      {name: '전남', pm10: this.state.data['jeonnam']},
      {name: '경북', pm10: this.state.data['gyeongbuk']},
      {name: '경남', pm10: this.state.data['gyeongnam']},
      {name: '제주', pm10: this.state.data['jeju']},
      {name: '세종', pm10: this.state.data['sejong']}
    ]
    
    return (
      <MenuList>
        {sidoList.map((e, i) => {
          return (
            <MenuItem key={i}>
              <MenuItemTitle>{e.name}</MenuItemTitle>
              <p>{e.pm10}</p>
            </MenuItem>
          )
        })}
      </MenuList>
    );
  }
}

export default Menu;