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

export default class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
    this.register = this.register.bind(this)
  }
  register () {
    let user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation
    }
    console.log(user)
    this.props.history.push('login')
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
          <FormField label={`EMAIL`}>
            <TextInput
              onDOMChange={e => this.setState({ email: e.target.value })}
              value={this.state.email}
            />
          </FormField>
          <FormField label={`PASSWORD`}>
            <PasswordInput
              onChange={e => this.setState({ password: e.target.value })}
              value={this.state.password}
            />
          </FormField>
          <FormField label={`PASSWORD CONFIRMATION`}>
            <PasswordInput
              onChange={e => this.setState({ passwordConfirmation: e.target.value })}
              value={this.state.passwordConfirmation}
            />
          </FormField>
          <Box pad={{'vertical': 'medium'}}>
            <Button fill primary type={`submit`} label={`注册`} onClick={this.register}/>
          </Box>
        </Form>
        <Anchor primary path={`/auth/login`} label={`已有账号？点此立即登录`}/>
      </div>
    )
  }
}
