import React from 'react'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'

import { RedirectAs404 } from '../Error'
import ActivityList from './ActivityList'
import ActivityItem from './ActivityItem'

export default class Activity extends React.Component {
  renderSubRoutes () {
    return (
      <Switch>
        <Route exact path={`/activity`} component={ActivityList}/>
        <Route exact path={`/activity/:_id`} component={ActivityItem}/>
        <Route component={RedirectAs404}/>
      </Switch>
    )
  }
  render () {
    return (
      <div>
        {this.renderSubRoutes()}
      </div>
    )
  }
}
