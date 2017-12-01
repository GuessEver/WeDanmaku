import React from 'react'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'

import { RedirectAs404 } from '../Error'
import ActivityList from './ActivityList'
import ActivityItem from './ActivityItem'
import ActivityAdmin from './ActivityAdmin'

export default class Activity extends React.Component {
  renderSubRoutes () {
    return (
      <Switch>
        <Route exact path="/activity" component={ActivityList}/>
        <Route exact path="/activity/:_id" component={ActivityItem}/>
        <Route exact path="/activity/:_id/admin" component={ActivityAdmin}/>
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
