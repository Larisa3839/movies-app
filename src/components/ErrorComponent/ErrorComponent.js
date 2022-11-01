import { Alert } from 'antd'
import React from 'react'

const ErrorComponent = ({ message }) => (
  <>
    <Alert message="Error Text" description={message} type="error" />
  </>
)
export default ErrorComponent
