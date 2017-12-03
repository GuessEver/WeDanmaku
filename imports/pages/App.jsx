import React from 'react'
import { Switch, Route } from 'react-router-dom'

import 'animate.css'
import 'grommet/grommet.min.css'

import { RedirectAs404 } from './Error'
import Home from './Home/Home'
import Dashboard from './Dashboard/Dashboard'
import Auth from './Auth/Auth'
import Activity from './Activity/Activity'

import { App as GrommetApp } from 'grommet'

export default class App extends React.Component {
  render () {
    return (
      <GrommetApp style={{background: 'transparent'}}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/activity" component={Activity}/>
          <Route component={RedirectAs404}/>
        </Switch>
      </GrommetApp>
    )
  }
}
