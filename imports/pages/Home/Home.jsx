import React from 'react'
import { render } from 'react-dom'

import {
  Hero,
  Image,
  Columns,
  Card,
  Section,
  Heading,
  Label,
  Button,
  Footer,
  Box
} from 'grommet'

const HeaderImage = () => <Image src="../../assets/A.png" fit="cover"/>
const HeaderBar = () => <Hero background={<HeaderImage/>} size="small"/>

const ServiceItem = props => {
  let r = () => parseInt(Math.random()*256)
  let cardStyle = {
    backgroundColor: `rgba(${r()}, ${r()}, ${r()}, .3)`
  }
  return (
    <Card style={cardStyle}>
      <Heading strong={false} tag="h2">{props.title}</Heading>
      <Label uppercase>{props.desc}</Label>
    </Card>
  )
}
const Services = () => {
  const services = [
    { title: '微信大屏幕', desc: 'Big Screen' },
    { title: '弹幕', desc: 'Danmaku' },
    { title: '签到', desc: 'Sign' },
    { title: '入场券', desc: 'Ticket' },
    { title: '邀请函', desc: 'Invitation' },
    { title: '幸运抽奖', desc: 'Lucky Draw' },
    { title: '摇一摇', desc: 'Shake a Shake' },
    { title: '投票', desc: 'Vote' },
    { title: '分析', desc: 'Analysis' }
  ]
  return (
    <Section>
      <Heading align="center">功能服务 | <Label uppercase>Services</Label></Heading>
      <Columns justify="center" masonry={false} responsive={false}>
        {services.map((o, idx) => <ServiceItem {...o} key={idx}/>)}
      </Columns>
    </Section>
  )
}
const ApplicationItem = props => {
  return (
    <Card>
      <Image src={props.img} fit="contain"/>
    </Card>
  )
}
const Applications = () => {
  let applications = [
    { img: 'http://www.math.uestc.edu.cn/templets/uestcmath/images/foot/foot-logo.png' }
  ]
  return (
    <Section>
      <Heading align="center">应用案例 | <Label uppercase>Applications</Label></Heading>
      <Columns justify="center">
        {applications.map((o, idx) => <ApplicationItem {...o} key={idx}/>)}
      </Columns>
    </Section>
  )
}

const Join = () => {
  return (
    <Section>
      <Heading align="center">立即试用 | <Label uppercase>Try Now</Label></Heading>
      <Columns justify="center">
        <Box pad="medium">
          <Button label="立即注册" path="/auth/register"/>
        </Box>
        <Box pad="medium">
          <Button primary label="立即登录" path="/auth/login"/>
        </Box>
      </Columns>
    </Section>
  )
}

const FooterBar = () => {
  return (
    <Footer size="large">
      <Columns justify="center" align="center">&copy; 2017 晴空工作室</Columns>
    </Footer>
  )
}

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <HeaderBar/>
        <Services/>
        <Applications/>
        <Join/>
        <FooterBar/>
      </div>
    )
  }
}
