import React from 'react'
import { IMessageHistory } from './MessageHistory'

interface MessageProps {
  message: IMessageHistory
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <li key={message.id}>
      <div className="message my-message">{message.content}</div>
    </li>
  )
}
