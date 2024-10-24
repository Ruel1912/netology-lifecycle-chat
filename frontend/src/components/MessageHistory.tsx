import React from 'react'
import { Message } from './Message'
import { Response } from './Response'

export interface IMessageHistory {
  id?: number
  userId?: string
  content: string
}

interface MessageHistoryProps {
  userId: string
  messages: IMessageHistory[]
}

export const MessageHistory: React.FC<MessageHistoryProps> = ({
  userId,
  messages,
}) => {
  const renderMessage = (message: IMessageHistory) => {
    const components = {
      message: Message,
      response: Response,
    }

    const Component =
      message.userId === userId ? components.message : components.response
    return <Component key={message.id} message={message} />
  }

  return (
    messages && (
      <div className="chat-history border-none">
        {userId && <ul>{messages.map((message) => renderMessage(message))}</ul>}
      </div>
    )
  )
}
