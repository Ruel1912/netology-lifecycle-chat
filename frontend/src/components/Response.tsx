import React from 'react'
import { IMessageHistory } from './MessageHistory'

interface ResponseProps {
  message: IMessageHistory
}

export const Response: React.FC<ResponseProps> = ({ message }) => {
  return (
    <li key={message.id}>
      <div className="message other-message">{message.content}</div>
    </li>
  )
}
