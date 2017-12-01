import React from 'react'
import { render } from 'react-dom'

import {
  Box,
  Form,
  FormField,
  TextInput,
  PasswordInput,
  Button,
  Anchor
} from 'grommet'

export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.login = this.login.bind(this)
  }
  login () {
    let user = {
      username: this.state.username,
      password: this.state.password
    }
    console.log(user)
    this.props.history.push('/dashboard')
  }
  render () {
    return (
      <div>
        <Form>
          <FormField label={`USERNAME`}>
            <TextInput
              onDOMChange={e => this.setState({ username: e.target.value })}
              value={this.state.username}
            />
          </FormField>
          <FormField label={`PASSWORD`}>
            <PasswordInput
              onChange={e => this.setState({ password: e.target.value })}
              value={this.state.password}
            />
          </FormField>
          <Box pad={{'vertical': 'medium'}}>
            <Button fill primary type={`submit`} label={`立即登录`} onClick={this.login}/>
          </Box>
        </Form>
        <Anchor primary path={`/auth/register`} label={`还没有账号？点此立即注册`}/>
      </div>
    )
  }
}
