import React, { FC } from 'react'
import { MdSend } from 'react-icons/md'
import { IMessageHistory } from './MessageHistory'

interface AddMessageProps {
  addMessage: (message: IMessageHistory) => void
}

const AddMessage: FC<AddMessageProps> = ({ addMessage }) => {
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    const newMessage = Object.fromEntries(
      formData
    ) as unknown as IMessageHistory
    addMessage(newMessage)
    target.reset()
  }

  return (
    <form method="POST" onSubmit={onSubmitHandler} className="w-full">
      <textarea
        className="relative textarea textarea-bordered textarea-lg w-full min-h-40"
        name="content"
        placeholder="Введите сообщение"
        id="content"
        required
        autoFocus
      ></textarea>
      <div className="absolute bottom-0 right-10 z-10 translate-x-1/2 -translate-y-1/2">
        <button type="submit" className="btn btn-circle w-8 h-8 min-h-8">
          <MdSend />
        </button>
      </div>
    </form>
  )
}

export default AddMessage
