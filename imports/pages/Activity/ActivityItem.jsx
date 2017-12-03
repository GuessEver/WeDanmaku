import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Activity from '../../classes/activity'
import Message from '../../classes/message'
import moment from 'moment'

import {
  Box,
  Tiles, Tile,
  Heading,
  Label,
  Paragraph,
  Icons,
  Anchor
} from 'grommet'

const HeaderBar = props => {
  let absoluteStyle = {
    position: 'absolute',
    top: '20px',
    width: '100px',
    height: '100px',
    background: 'lightgreen'
  }
  return (
    <div style={{position: 'relative', padding: '25px'}}>
      <Heading align="center">{props.activity.name}</Heading>
      <div align="center">
        <Label>{props.activity.description}</Label>
      </div>
      <div style={{...absoluteStyle, left: 0}}>
        WEDANMAKU<br/>LOGO
      </div>
      <div style={{...absoluteStyle, right: 0}}>QRCode</div>
    </div>
  )
}

class MessageItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hover: false,
      className: 'animated lightSpeedIn'
    }
  }
  toggleHover (e) {
    let hover = e === 'enter'
    let className = ''
    if (hover) {
      className = 'animated infinite pulse'
    }
    this.setState({ hover, className })
  }
  render () {
    return (
      <Box
        pad="medium"
        margin={{vertical: 'medium'}}
        colorIndex="brand"
        style={{borderRadius: '10px', cursor: 'pointer'}}
        onMouseEnter={this.toggleHover.bind(this, 'enter')}
        onMouseLeave={this.toggleHover.bind(this, 'leave')}
        className={this.state.className}
        onClick={e => console.log(e)}
      >
        <Tiles fill>
          <Tile align="start">{this.props.openId}</Tile>
          <Tile align="end">{moment(this.props.sendedAt).format('YYYY-MM-DD HH:mm:ss')}</Tile>
        </Tiles>
        <Paragraph>{this.props.content}</Paragraph>
      </Box>
    )
  }
}
class Messages extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      perPage: 3,
      fromIdx: 0,
      messages: []
    }
  }
  componentDidMount () {
    this.flushMessages()
  }
  flushMessages () {
    let messages = this.state.messages
    let fromIdx = this.state.fromIdx
    if (messages.length <= this.state.perPage && this.props.messages.length > fromIdx) {
      let msg = this.props.messages[fromIdx]
      if (msg && !_.find(messages, o => o._id === msg._id)) {
        messages = [msg, ...messages]
      }
      fromIdx = (fromIdx + 1) % this.props.messages.length
    }
    if (messages.length > this.state.perPage) {
      messages.pop()
    }
    this.setState({ fromIdx, messages })
    if (messages.length) {
      setTimeout(this.flushMessages.bind(this), 5000)
    } else {
      setTimeout(this.flushMessages.bind(this), 100)
    }
  }
  render () {
    return (
      <div>
        {this.state.messages.map(o => <MessageItem {...o} key={o._id}/>)}
      </div>
    )
  }
}

class ActivityItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fullScreen: false
    }
  }
  toggleFullScreen () {
    let fullScreen = !this.state.fullScreen
    this.setState({ fullScreen })
    if (fullScreen) {
      try {
        document.documentElement.webkitRequestFullscreen()
      } catch (e) {}
    } else {
      try {
        document.webkitExitFullscreen()
      } catch (e) {}
    }
  }
  render () {
    const FullScreenIcon = Icons.Base.Layer
    return (
      <Box pad="medium" style={{position: 'relative', color: '#fff'}}>
        <div class="bg" style={{backgroundImage: 'url(/images/activity-bg.png)'}}/>
        <div style={{position: 'absolute', top: '10px', right: '25px'}}>
          <Anchor
            label={`${this.state.fullScreen ? '退出' : '进入'}全屏模式`}
            icon={<FullScreenIcon/>}
            onClick={this.toggleFullScreen.bind(this)}
            style={{color: '#fff'}}
          />
        </div>
        <HeaderBar activity={this.props.activity}/>
        <Messages messages={this.props.messages}/>
      </Box>
    )
  }
}
export default withTracker(props => {
  Meteor.subscribe('activity')
  Meteor.subscribe('message', props.match.params._id)
  let activity = Activity.findOne(props.match.params._id)
  let messages = Message.find({
    activityId: props.match.params._id,
    onScreen: true
  }).fetch()
  return {
    activity: activity || new Activity(),
    messages: messages
  }
})(ActivityItem)
