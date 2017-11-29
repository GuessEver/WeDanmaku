import React from 'react'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'

import { RedirectAs404 } from '../Error'
import Login from './Login'
import Register from './Register'

const renderRoutes = (base) => {
  return (
    <Switch>
      <Route exact path={`${base}/login`} component={Login}/>
      <Route exact path={`${base}/register`} component={Register}/>
      <Route component={RedirectAs404}/>
    </Switch>
  )
}

import {
  Box,
  Heading,
  Label
} from 'grommet'

export default class Auth extends React.Component {
  render () {
    return (
      <div style={{minHeight: '1000px'}}>
        <Box justify={`center`} align={`center`} full={`vertical`}>
          <Box colorIndex={`light-2`} pad={`medium`} align={`center`}>
            <Heading>WeDanmaku</Heading>
            <Label>最懂校园活动的互动系统</Label>
            {renderRoutes(this.props.match.url)}
          </Box>
        </Box>
      </div>
    )
  }
}
