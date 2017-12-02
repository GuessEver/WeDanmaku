import React from 'react'

import {
  Header,
  Title,
  Anchor,
  Menu
} from 'grommet'

export default class HeaderBar extends React.Component {
  render () {
    return (
      <Header fixed>
        <Title>WeDanmaku</Title>
        {this.props.title && <Title> | {this.props.title}</Title>}
        <Menu inline direction='row' flex justify="end">
          <Anchor label="控制中心" path="/dashboard"/>
          <Anchor label="我的活动列表" path="/activity"/>
        </Menu>
      </Header>
    )
  }
}
