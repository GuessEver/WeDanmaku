import React from 'react'
import { render } from 'react-dom'

import {
  Hero,
  Image,
  Columns,
  Card,
  Box,
  Section,
  Heading,
  Label,
  Button
} from 'grommet'

const HeaderImage = () => <Image src={`../../assets/A.png`} fit={`cover`}/>
const Header = () => <Hero background={<HeaderImage/>} size={`small`}/>

const ServiceItem = (props) => {
  let r = () => parseInt(Math.random()*256)
  let cardStyle = {
    backgroundColor: `rgba(${r()}, ${r()}, ${r()}, .3)`
  }
  return (
    <Card style={cardStyle}>
      <Heading strong={false} tag={`h2`}>{props.title}</Heading>
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
      <Heading align={`center`}>功能服务 | <Label uppercase>Services</Label></Heading>
      <Columns justify={`center`} masonry={false} responsive={false}>
        {services.map((o, idx) => <ServiceItem {...o} key={idx}/>)}
      </Columns>
    </Section>
  )
}
const ApplicationItem = (props) => {
  return (
    <Card>
      <Image src={props.img} fit={`contain`}/>
    </Card>
  )
}
const Applications = () => {
  let applications = [
    { img: 'http://www.math.uestc.edu.cn/templets/uestcmath/images/foot/foot-logo.png' }
  ]
  return (
    <Section>
      <Heading align={`center`}>应用案例 | <Label uppercase>Application</Label></Heading>
      <Columns justify={`center`}>
        {applications.map((o, idx) => <ApplicationItem {...o} key={idx}/>)}
      </Columns>
    </Section>
  )
}

const Join = () => {
  return (
    <Section colorIndex={`light-2`}>
      {/*<Box align={`center`}>*/}
        <Button label={`立即注册`} path={`/auth/register`}/>
      {/*</Box>*/}
      {/*<Box align={`center`}>*/}
        <Button primary label={`立即登录`} path={`/auth/login`}/>
      {/*</Box>*/}
    </Section>
  )
}

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <Header/>
        <Join/>
        <Services/>
        <Applications/>
        <Join/>
      </div>
    )
  }
}
