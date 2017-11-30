import React from 'react'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'

import { RedirectAs404 } from '../Error'
import ActivityList from './ActivityList'
import ActivityItem from './ActivityItem'

const SubRoutes = (props) => {
  return (
    <Switch>
      <Route exact path={`${props.base}`} component={ActivityList}/>
      <Route exact path={`${props.base}/:_id`} component={ActivityItem}/>
      <Route component={RedirectAs404}/>
    </Switch>
  )
}


export default class Activity extends React.Component {
  render () {
    return (
      <div>
        <SubRoutes base={this.props.match.url}/>
      </div>
    )
  }
}
