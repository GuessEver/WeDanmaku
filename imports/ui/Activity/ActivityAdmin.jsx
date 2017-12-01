import React from 'react'
import { render } from 'react-dom'

import { HeaderBar } from '../Dashboard/Dashboard'
import {
  Section,
  Columns,
  Box,
  Notification,
  Heading,
  Tabs, Tab,
  FormField, TextInput,
  Button,
  Image
} from 'grommet'

const StatusBar = (props) => {
  if (props.endedAt) {
    return <Notification message="活动已经结束，您不能修改任何数据" status="ok"/>
  } else if (props.startedAt) {
    return <Notification message="活动正在进行，您将只能修改部分设置" status="warning"/>
  } else {
    return <Notification message="活动还未开始，您可以修改活动设置"/>
  }
}

const Settings = () => {
  return (
    <Columns>
      <Section pad="small" align="center">
        <Heading tag="h3">活动信息</Heading>
        <FormField label="活动标题">
          <TextInput value="活动标题"/>
        </FormField>
        <FormField label="一句话描述">
          <TextInput value="活动描述"/>
        </FormField>
        <Box pad={{'vertical': 'medium'}}>
          <Button fill label="保存"/>
        </Box>
      </Section>
      <Section pad="small" align="center">
        <Heading tag="h3">微信接口</Heading>
        <FormField label="URL">
          <TextInput value="/api/activity/_id/wechat" disabled/>
        </FormField>
        <FormField label="TOKEN">
          <TextInput value="random-string" disabled/>
        </FormField>
        <Box pad={{'vertical': 'medium'}}>
          <Button fill label="重置TOKEN"/>
        </Box>
      </Section>
      <Section pad="small" align="center">
        <Heading tag="h3">二维码</Heading>
        <Image style={{width: '256px', height: '256px', margin: 0}}/>
      </Section>
    </Columns>
  )
}

const MessageReviewer = () => {
  return (
    <Section>
    </Section>
  )
}
const Reviewer = () => {
  return (
    <Tabs justify="start">
      <Tab title="消息审核">
        <MessageReviewer/>
      </Tab>
    </Tabs>
  )
}

export default class ActivityAdmin extends React.Component {
  render () {
    return (
      <div>
        <HeaderBar title="活动名字"/>
        <StatusBar/>
        <Settings/>
        <Reviewer/>
      </div>
    )
  }
}
