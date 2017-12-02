import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Activity from '../../classes/activity'

import HeaderBar from '../Dashboard/HeaderBar'
import {
  Section,
  Columns,
  Box,
  Notification,
  Heading,
  Tabs, Tab,
  FormField, TextInput, DateTime,
  Button,
  Image,
  Table, TableRow,
  CheckBox,
  Timestamp
} from 'grommet'

const StatusBar = props => {
  if (props.endedAt) {
    return <Notification message="活动已经结束，您不能修改任何数据" status="ok"/>
  } else if (props.startedAt) {
    return <Notification message="活动正在进行，您将只能修改部分设置" status="warning"/>
  } else {
    return <Notification message="活动还未开始，您可以修改活动设置"/>
  }
}

class ActivitySettings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      _id: props.activity ? props.activity._id : '',
      name: props.activity ? props.activity.name : '',
      description: props.activity ? props.activity.description : '',
      token: props.activity ? props.activity.token : '',
      startedAt: props.activity ? props.activity.startedAt : new Date(),
      endedAt: props.activity ? props.activity.endedAt : new Date()
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
      <Columns masonry maxCount={3}>
        <Section pad="small" align="center">
          <Heading tag="h3">活动信息</Heading>
          <FormField label="活动标题">
            <TextInput
              value={this.state.name}
              onDOMChange={e => this.setState({name: e.target.value})}
            />
          </FormField>
          <FormField label="一句话描述">
            <TextInput
              value={this.state.description}
              onDOMChange={e => this.setState({description: e.target.value})}
            />
          </FormField>
          <Box pad={{'vertical': 'medium'}}>
            <Button fill label="保存" onClick={this.saveInformation.bind(this)}/>
          </Box>
        </Section>
        <Section pad="small" align="center">
          <Heading tag="h3">活动时间</Heading>
          <FormField label="开始时间">
            <DateTime value={this.state.startedAt} format="YYYY-MM-DD HH:mm:ss" disabled/>
          </FormField>
          <FormField label="结束时间">
            <DateTime value={this.state.endedAt} format="YYYY-MM-DD HH:mm:ss" disabled/>
          </FormField>
          <Box pad={{'vertical': 'medium'}}>
            <Button fill label="开始" onClick={this.setStart.bind(this)}/>
            <Button fill label="结束" onClick={this.setEnd.bind(this)}/>
          </Box>
        </Section>
        <Section pad="small" align="center">
          <Heading tag="h3">微信接口</Heading>
          <FormField label="URL">
            <TextInput value={`${window.location.origin}/api/activity/${this.state._id}/wechat`} disabled/>
          </FormField>
          <FormField label="TOKEN">
            <TextInput value={this.state.token} disabled/>
          </FormField>
          <Box pad={{'vertical': 'medium'}}>
            <Button fill label="重置TOKEN" onClick={this.resetToken.bind(this)}/>
          </Box>
        </Section>
        <Section pad="small" align="center">
          <Heading tag="h3">二维码</Heading>
          <Image style={{width: '256px', height: '256px', margin: 0}}/>
        </Section>
      </Columns>
    )
  }
}

class Reviewers extends React.Component {
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
      <Tabs justify="start">
        <Tab title="消息审核">
          <Section>
            <div align="right">
              <CheckBox
                label="微信墙自动审核"
                checked={this.props.activity && this.props.activity.autoOnScreen}
                onChange={this.toggleAutoOnScreen.bind(this)}
              />
              <CheckBox
                label="弹幕自动审核"
                checked={this.props.activity && this.props.activity.autoOnDanmaku}
                onChange={this.toggleAutoOnDanmaku.bind(this)}
              />
            </div>
            <Table>
              <thead>
              <tr>
                <th width="100px">用户</th>
                <th width="100px">时间</th>
                <th>内容</th>
                <th width="100px">微信墙</th>
                <th width="100px">弹幕</th>
              </tr>
              </thead>
              <tbody>
              {this.props.messages.map(o => (
                <TableRow key={o._id}>
                  <td>{o.openId}</td>
                  <td>
                    <Timestamp value={o.sendedAt} fields="time"/>
                  </td>
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
        </Tab>
      </Tabs>
    )
  }
}

class ActivityAdmin extends React.Component {
  render () {
    return (
      <div>
        <HeaderBar title="活动名字"/>
        <StatusBar {...this.props.activity}/>
        <ActivitySettings activity={this.props.activity}/>
        <Reviewers messages={this.props.messages} activity={this.props.activity}/>
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
    messages: activity ? activity.messages().fetch() : []
  }
})(ActivityAdmin)
