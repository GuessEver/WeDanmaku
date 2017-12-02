import React from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import Activity from '../../classes/activity'

import HeaderBar from '../Dashboard/HeaderBar'
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
      heading={props.name} headingStrong={false}
      description={props.description}
      link={<CardLink/>}
    />
  )
}

class ActivityList extends React.Component {
  render () {
    return (
      <div>
        <HeaderBar title="活动列表"/>
        <Tiles>
          {this.props.activities.map(o => (
            <Tile hoverStyle="border" key={o._id}>
              <ActivityListItem {...o}/>
            </Tile>
          ))}
        </Tiles>
      </div>
    )
  }
}

export default withTracker(props => {
  Meteor.subscribe('activity')
  return {
    activities: Activity.find().fetch(),
  }
})(ActivityList)
