import React from 'react'
import { Redirect } from 'react-router-dom'

export default class Error extends React.Component {
  render () {
    return (
      <div>
        <h1>ERROR</h1>
        <div>code: {this.props.error.code}</div>
        <div>message: {this.props.error.message}</div>
      </div>
    )
  }
}

export class RedirectAs404 extends React.Component {
  render () {
    return (
      <Redirect to={{
        ...this.props.location,
        isError: true,
        error: {
          code: 404,
          message: 'Not found'
        }
      }}/>
    )
  }
}
