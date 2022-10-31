import { Alert } from 'antd'
import React from 'react'

const ErrorComponent = ({ message }) => (
  <>
    <Alert
      message={message}
      description="Error Description Error Description Error Description Error Description"
      type="error"
    />
  </>
)
export default ErrorComponent
