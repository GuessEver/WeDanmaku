import { Meteor } from 'meteor/meteor'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import Error from '../imports/pages/Error'
import App from '../imports/pages/App'

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
