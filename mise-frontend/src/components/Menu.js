import React, { Component } from 'react';
import styled from 'styled-components';

const cityList = [
  {
    id: 'seoul',
    name: '서울',
    image: 'https://ak6.picdn.net/shutterstock/videos/20766046/thumb/1.jpg'
  },
  {
    id: 'busan',
    name: '부산',
    image: 'https://www.mcst.go.kr/attachFiles/cultureInfoCourt/localFestival/notifyFestival/1523839838562.jpg'
  },
  {
    id: 'daegu',
    name: '대구',
    image: 'http://cfile209.uf.daum.net/image/20192A4D4FFA2FD018C65E'
  },
  {
    id: 'incheon',
    name: '인천',
    image: 'https://ak6.picdn.net/shutterstock/videos/20766046/thumb/1.jpg'
  },
  {
    id: 'gwangju',
    name: '광주',
    image: 'https://ak6.picdn.net/shutterstock/videos/20766046/thumb/1.jpg'
  },
  {
    id: 'daejeon',
    name: '대전',
    image: 'https://ak6.picdn.net/shutterstock/videos/20766046/thumb/1.jpg'
  },
  {
    id: 'ulsan',
    name: '울산',
    image: 'https://ak6.picdn.net/shutterstock/videos/20766046/thumb/1.jpg'
  },
  {
    id: 'gyeonggi',
    name: '경기',
    image: 'https://ak6.picdn.net/shutterstock/videos/20766046/thumb/1.jpg'
  },
  {
    id: 'gangwon',
    name: '강원',
    image: 'https://ak6.picdn.net/shutterstock/videos/20766046/thumb/1.jpg'
  },
  {
    id: 'chungbuk',
    name: '충북',
    image: 'https://ak6.picdn.net/shutterstock/videos/20766046/thumb/1.jpg'
  },
  {
    id: 'chungnam',
    name: '충남',
    image: 'https://ak6.picdn.net/shutterstock/videos/20766046/thumb/1.jpg'
  },
  {
    id: 'jeonbuk',
    name: '전북',
    image: 'https://ak6.picdn.net/shutterstock/videos/20766046/thumb/1.jpg'
  },
  {
    id: 'jeonnam',
    name: '전남',
    image: 'https://ak6.picdn.net/shutterstock/videos/20766046/thumb/1.jpg'
  },
  {
    id: 'gyeongbuk',
    name: '경북',
    image: 'https://ak6.picdn.net/shutterstock/videos/20766046/thumb/1.jpg'
  },
  {
    id: 'gyeongnam',
    name: '경남',
    image: 'https://ak6.picdn.net/shutterstock/videos/20766046/thumb/1.jpg'
  },
  {
    id: 'jeju',
    name: '제주',
    image: 'https://ak6.picdn.net/shutterstock/videos/20766046/thumb/1.jpg'
  },
  {
    id: 'sejong',
    name: '세종',
    image: 'https://ak6.picdn.net/shutterstock/videos/20766046/thumb/1.jpg'
  }
]

const MenuList = styled.ul`
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  overflow: auto;
  min-width: 180px;
  border-left: 1px solid #ddd;
`
const MenuItem = styled.li`
  /* background-image: url(${props => props.image});
  background-size: cover;
  color: #fff; */
  padding: 12px;
  border-bottom: 1px solid #ddd;
  &:hover{
    opacity: 0.9;
  }
`
const MenuItemTitle = styled.h4`
  font-size: 2em;
  font-weight: 100;
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

  componentWillReceiveProps(){
    const cityData = cityList.reduce((acc, cur) => {
      for (let key in this.props.data[0]){
        if (key === cur.id){
          acc.push({...cur, pm10: this.props.data[0][key]})          
        }
      }
      return acc;
    }, [])
    this.setState({data: cityData})
  }
  
  render() {

    return (
      <MenuList>
        {this.state.data.map((e, i) => {
          return (
            <MenuItem key={i} image={e.image}>
              <MenuItemTitle>{e.name}</MenuItemTitle>
              {/* <p>미세먼지 지수 : {e.pm10}</p> */}
              <button onClick={() => this.props.onClickCity(e.id, e.name)}>보기</button>
            </MenuItem>
          )
        })}
      </MenuList>
    );
  }
}

export default Menu;