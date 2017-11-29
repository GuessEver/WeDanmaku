import React from 'react'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'

import 'grommet/grommet.min.css'

import { RedirectAs404 } from './Error'
import Home from './Home/Home'
import Auth from './Auth/Auth'
import Activity from './Activity/Activity'

import { App as GROMMET_APP } from 'grommet'

export default class App extends React.Component {
  render () {
    return (
      <GROMMET_APP>
        <Switch>
          <Route exact path={`/`} component={Home}/>
          <Route path={`/auth`} component={Auth}/>
          <Route path={`/activity`} component={Activity}/>
          <Route component={RedirectAs404}/>
        </Switch>
      </GROMMET_APP>
    )
  }
}
