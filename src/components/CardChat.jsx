import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { FaUser } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'

const CardChat = ({ sender, msg, image }) => {
    return (
        <div className={`flex flex-row gap-3 ${sender === "me" ? 'justify-end' : 'justify-start'}`}>
            <Avatar className={`${sender === "me" ? 'order-2' : ''}`}>
                <AvatarImage src={image} />
                <AvatarFallback><FaUser /></AvatarFallback>
            </Avatar>
            <div className={`px-4 py-2  rounded-[5px] bg-gray-100 max-w-[300px] w-fit ${sender === "me" ? 'order-1' : ''}`}>
                <ReactMarkdown className='whitespace-pre-wrap'>
                    {msg}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default CardChat