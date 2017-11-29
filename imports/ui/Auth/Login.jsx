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
  render () {
    return (
      <div>
        <Form>
          <FormField label={`USERNAME`}>
            <TextInput />
          </FormField>
          <FormField label={`PASSWORD`}>
            <PasswordInput />
          </FormField>
          <Box pad={{'vertical': 'medium'}}>
            <Button fill primary label={`立即登录`}/>
          </Box>
        </Form>
        <Anchor primary href={`register`} label={`还没有账号？点此立即注册`}/>
      </div>
    )
  }
}
