import { useEffect, useState } from 'react'
import { IMessageHistory, MessageHistory } from './MessageHistory'
import { v4 as uuidv4 } from 'uuid'
import AddMessage from './AddMessage'
const { VITE_BACKEND_URL: backendUrl } = import.meta.env

const getUserId = (): string => {
  const storedUserId = localStorage.getItem('userId');
  if (storedUserId) {
    return storedUserId;
  }

  const generatedUserId = uuidv4();
  localStorage.setItem('userId', generatedUserId);
  return generatedUserId;
}

const Chat = () => {
  const userId = getUserId()

  const [messages, setMessages] = useState<IMessageHistory[]>([])
  const [lastMessageId, setLastMessageId] = useState<number>(messages.length)

  const fetchMessage = () => {
    fetch(`${backendUrl}/messages?from=${lastMessageId}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.length > 0) {
          setMessages([...messages, ...json])
          setLastMessageId(json[json.length - 1].id)
        }
      })
      .catch((error) => console.error(error))
  }

  const addMessage = (message: IMessageHistory) => {
    fetch(`${backendUrl}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, ...message }),
    })
      .then(fetchMessage)
      .catch((error) => console.error(error))
  }

  useEffect(fetchMessage, [])

  useEffect(() => {
    const interval = setInterval(() => fetchMessage(), 2000)

    return () => clearInterval(interval)
  }, [])

  return userId && (
    <div className="clearfix container max-w-lg">
      <div className="relative chat-wrapper flex flex-col justify-between">
          <MessageHistory userId={userId} messages={messages} />
          <AddMessage addMessage={addMessage} />
      </div>
    </div>
  )
}

export default Chat
