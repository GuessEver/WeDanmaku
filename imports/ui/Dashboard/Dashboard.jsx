import React from 'react'
import { render } from 'react-dom'

import {
  Header,
  Title,
  Anchor,
  Menu
} from 'grommet'

export const HeaderBar = (props) => {
  return (
    <Header fixed>
      <Title>WeDanmaku</Title>
      {props.title && <Title>| {props.title}</Title>}
      <Menu inline direction='row' flex justify="end">
        <Anchor label="控制中心" path="/dashboard"/>
        <Anchor label="我的活动列表" path="/activity"/>
      </Menu>
    </Header>
  )
}

export default class Dashboard extends React.Component {
  render () {
    return (
      <div>
        <HeaderBar/>
        Dashboard works
      </div>
    );
  }
}
