import React from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Activity } from '../../model/Activity'

import { HeaderBar } from '../Dashboard/Dashboard'
import {
  Tiles,
  Tile,
  Card,
  Anchor
} from 'grommet'

export const ActivityListItem = (props) => {
  let status = '未开始'
  if (props.endedAt) status = '已结束'
  else if (props.startedAt) status = '正在进行'
  const CardLink = () => <Anchor primary label="进入活动" path={`/activity/${props._id}/admin`}/>
  return (
    <Card
      thumbnail="/images/bg2.jpg"
      label={status}
      heading={props.name + ''} headingStrong={false}
      description={props.description}
      link={<CardLink/>}
    >{props.description}</Card>
  )
}

export default class ActivityList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activities: []
    }
    Meteor.subscribe('activity')
  }
  componentDidMount () {
    Tracker.autorun(() => {
      this.setState({
        activities: Activity.find().fetch()
      })
    })
  }
  render () {
    return (
      <div>
        <HeaderBar title="活动列表"/>
        <Tiles>
          {this.state.activities.map(o => (
            <Tile hoverStyle="border" key={o._id}>
              <ActivityListItem {...o}/>
            </Tile>
          ))}
        </Tiles>
      </div>
    )
  }
}
