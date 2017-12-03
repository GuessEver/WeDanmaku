import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Activity from '../../classes/activity'
import moment from 'moment'

import HeaderBar from '../Dashboard/HeaderBar'
import {
  Section,
  Tiles, Tile,
  Box,
  Notification,
  Heading,
  Tabs, Tab,
  FormField, TextInput,
  Button,
  Image,
  Table, TableRow,
  CheckBox
} from 'grommet'

const StatusBar = props => {
  if (!props.activity || !props.activity.isStarted()) {
    return <Notification message="活动还未开始" status="warning"/>
  } else if (props.activity.isInProcess()) {
    return <Notification message="活动正在进行" status="ok"/>
  } else {
    return <Notification message="活动已经结束" status="critical"/>
  }
}

class ActivitySettings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.activity ? props.activity.name : '',
      description: props.activity ? props.activity.description : ''
    }
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.activity) return
    this.setState({
      ...nextProps.activity,
    })
  }
  saveInformation () {
    this.props.activity.callMethod('update', this.state.name, this.state.description)
  }
  resetToken () {
    if (!confirm('Sure???')) return
    this.props.activity.callMethod('resetToken')
  }
  setStart () {
    this.props.activity.callMethod('start')
  }
  setEnd () {
    this.props.activity.callMethod('end')
  }
  render () {
    return (
      <Tiles fill>
        <Tile>
          <Section>
            <Heading tag="h3">活动信息</Heading>
            <FormField label="活动标题（不超过20个字）">
              <TextInput
                value={this.state.name}
                onDOMChange={e => this.setState({name: e.target.value})}
              />
            </FormField>
            <FormField label="一句话描述（不超过50个字）">
              <TextInput
                value={this.state.description}
                onDOMChange={e => this.setState({description: e.target.value})}
              />
            </FormField>
            {!this.props.activity.isEnded() &&
            <Box pad={{'vertical': 'medium'}}>
              <Button fill label="保存" onClick={this.saveInformation.bind(this)}/>
            </Box>}
          </Section>
        </Tile>
        <Tile>
          <Section>
            <Heading tag="h3">活动时间</Heading>
            <FormField label="开始时间">
              {this.props.activity.isStarted()
                ? <TextInput value={moment(this.props.activity.startedAt).format('YYYY-MM-DD HH:mm:ss')} disabled/>
                : <TextInput value="未开始" disabled/>}
            </FormField>
            <FormField label="结束时间">
              {this.props.activity.isEnded()
                ? <TextInput value={moment(this.props.activity.endedAt).format('YYYY-MM-DD HH:mm:ss')} disabled/>
                : <TextInput value="未结束" disabled/>}
            </FormField>
            <Box pad={{'vertical': 'medium'}}>
              {!this.props.activity.isStarted() &&
              <Button fill label="开始" onClick={this.setStart.bind(this)}/>}
              {this.props.activity.isInProcess() &&
              <Button fill label="结束" onClick={this.setEnd.bind(this)}/>}
            </Box>
          </Section>
        </Tile>
        <Tile>
          <Section>
            <Heading tag="h3">微信接口</Heading>
            <FormField label="URL">
              <TextInput value={`${window.location.origin}/api/activity/${this.props.activity._id}/wechat`} disabled/>
            </FormField>
            <FormField label="TOKEN">
              <TextInput value={this.props.activity.token} disabled/>
            </FormField>
            <Box pad={{'vertical': 'medium'}}>
              {!this.props.activity.isEnded() &&
              <Button fill label="重置TOKEN" onClick={this.resetToken.bind(this)}/>}
            </Box>
          </Section>
        </Tile>
        <Tile>
          <Section>
            <Heading tag="h3">二维码</Heading>
            <Image style={{width: '256px', height: '256px', margin: 0}}/>
          </Section>
        </Tile>
      </Tiles>
    )
  }
}

class MessageReviewer extends React.Component {
  toggleOnScreen (message) {
    message.callMethod('toggleOnScreen')
  }
  toggleOnDanmaku (message) {
    message.callMethod('toggleOnDanmaku')
  }
  toggleAutoOnScreen () {
    this.props.activity.callMethod('toggleAutoOnScreen')
  }
  toggleAutoOnDanmaku () {
    this.props.activity.callMethod('toggleAutoOnDanmaku')
  }
  render () {
    return (
      <Section>
        <div align="right">
          <CheckBox
            label="微信大屏幕自动通过"
            checked={this.props.activity.autoOnScreen}
            onChange={this.toggleAutoOnScreen.bind(this)}
          />
          <CheckBox
            label="弹幕自动通过"
            checked={this.props.activity.autoOnDanmaku}
            onChange={this.toggleAutoOnDanmaku.bind(this)}
          />
        </div>
        <Table onMore={e => console.log(e)}>
          <thead>
          <tr>
            <th width="100px">用户</th>
            <th width="100px">时间</th>
            <th>内容</th>
            <th width="100px">微信大屏幕</th>
            <th width="100px">弹幕</th>
          </tr>
          </thead>
          <tbody>
          {this.props.messages.map(o => (
            <TableRow key={o._id}>
              <td>{o.openId}</td>
              <td>{moment(o.sendedAt).format('HH:mm:ss')}</td>
              <td>{o.content}</td>
              <td>
                <CheckBox toggle checked={o.onScreen} onChange={this.toggleOnScreen.bind(this, o)}/>
              </td>
              <td>
                <CheckBox toggle checked={o.onDanmaku} onChange={this.toggleOnDanmaku.bind(this, o)}/>
              </td>
            </TableRow>
          ))}
          </tbody>
        </Table>
      </Section>
    )
  }
}

class ActivityAdmin extends React.Component {
  render () {
    if (!this.props.activity) return <div></div>
    return (
      <div>
        <HeaderBar title={this.props.activity.name}/>
        <StatusBar activity={this.props.activity}/>
        <ActivitySettings activity={this.props.activity}/>
        <Tabs justify="start">
          <Tab title="消息审核">
            <MessageReviewer messages={this.props.messages} activity={this.props.activity}/>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default withTracker(props => {
  Meteor.subscribe('activity')
  Meteor.subscribe('message', props.match.params._id)
  let activity = Activity.findOne(props.match.params._id)
  return {
    activity: activity,
    messages: activity ? activity.messages({sort:{sendedAt: -1}}).fetch() : []
  }
})(ActivityAdmin)
