import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'

import {
  Box,
  Form,
  FormField,
  TextInput,
  PasswordInput,
  Button
} from 'grommet'

export default class Register extends React.Component {
  render () {
    return (
      <div>
        <Form>
          <FormField label={`USERNAME`}>
            <TextInput />
          </FormField>
          <FormField label={`EMAIL`}>
            <TextInput />
          </FormField>
          <FormField label={`PASSWORD`}>
            <PasswordInput />
          </FormField>
          <FormField label={`PASSWORD REPEAT`}>
            <PasswordInput />
          </FormField>
          <Box pad={{'vertical': 'medium'}}>
            <Button fill primary label={`注册`}/>
          </Box>
        </Form>
        <Link to={`login`}>已有账号？点此立即登录</Link>
      </div>
    )
  }
}
