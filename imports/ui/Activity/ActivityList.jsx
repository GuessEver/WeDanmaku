import React from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Activity } from '../../model/Activity'

import {
  Tiles,
  Tile,
  Card,
  Anchor
} from 'grommet'

const ActivityListItem = (props) => {
  let status = '未开始'
  if (new Date() >= props.startedAt) status = '正在进行'
  if (new Date() > props.endedAt) status = '已结束'
  const CardLink = () => <Anchor primary label={`进入活动`} path={`/activity/${props._id}`}/>
  return (
    <Tile hoverStyle={`border`}>
      <Card
        thumbnail={``}
        label={status}
        heading={props.name + ''} headingStrong={false}
        description={props.description}
        link={<CardLink/>}
      >{props.description}</Card>
    </Tile>
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
        <Tiles>
          {this.state.activities.map(o => <ActivityListItem {...o} key={o._id}/>)}
        </Tiles>
      </div>
    )
  }
}
