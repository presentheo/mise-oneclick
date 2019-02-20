import React, { Component } from 'react';
import styled from 'styled-components';
import { getPm10Grade } from '../utils';
import { Badge } from '../App';

const MenuList = styled.ul`
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  overflow: auto;
  min-width: 180px;
  z-index: 1;
  background-color: #fff;
`
const MenuItem = styled.li`
  padding: 15px 10px 15px 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  &:hover{
    opacity: 0.7;
    cursor: pointer;
  }
`
const MenuItemTitle = styled.h4`
  font-size: 2em;
  font-weight: 100;
  margin: 0;
  padding: 0;
`
const MenuItemContent = styled.div`
  margin-left: 20px;
  padding-left: 10px;
  border-left: 1px solid #ddd;
`
const MenuItemValue = styled.p`
  font-size: 14px;
  margin-bottom: 6px;
`
class Menu extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     data: cityList
  //   }
  // }
  render() {
    return (
      <MenuList>
        {this.props.data.map((e, i) => {
          return (
            <MenuItem
              key={i}
              onClick={() => this.props.onClickCity(e.id, e.name)}>
              <MenuItemTitle>{e.name}</MenuItemTitle>
              <MenuItemContent>
                <MenuItemValue>{e.pm10}㎍/m³</MenuItemValue>
                <Badge grade={getPm10Grade(e.pm10)}>{getPm10Grade(e.pm10)}</Badge>
              </MenuItemContent>
            </MenuItem>
          )
        })}
      </MenuList>
    );
  }
}

export default Menu;