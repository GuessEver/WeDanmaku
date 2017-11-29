import { Meteor } from 'meteor/meteor'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import Error from '../imports/ui/Error'
import App from '../imports/ui/App'

Meteor.startup(() => {
  render((
    <BrowserRouter>
      <Route render={({ location }) => (
        location.isError
          ? <Error error={location.error}/>
          : <App/>
      )}/>
    </BrowserRouter>
  ), document.getElementById('root'))
})
