import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { RedirectAs404 } from '../Error'
import ActivityList from './ActivityList'
import ActivityItem from './ActivityItem'
import ActivityAdmin from './ActivityAdmin'

export default class Activity extends React.Component {
  render () {
    return (
      <div>
        <Switch>
          <Route exact path="/activity" component={ActivityList}/>
          <Route exact path="/activity/:_id" component={ActivityItem}/>
          <Route exact path="/activity/:_id/admin" component={ActivityAdmin}/>
          <Route component={RedirectAs404}/>
        </Switch>
      </div>
    )
  }
}
