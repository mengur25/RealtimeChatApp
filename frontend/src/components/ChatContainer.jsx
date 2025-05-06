import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import MessageInput from './MessageInput.jsx';
import ChatHeader from './ChatHeader.jsx';
import MessageSkeleton from './skeletons/MessageSkeleton.jsx';
import { useAuthStore } from '../store/useAuthStore.js';
import Avatar from './Avatar.jsx';
import { formatMessageTime } from '../utils/helper.js';
const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subcribeToMessages,
    unsubcribeToMessages
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subcribeToMessages();

    return () => unsubcribeToMessages();
  }, [selectedUser._id, getMessages, subcribeToMessages, unsubcribeToMessages]);


  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])

  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                {message.senderId === authUser._id ? (
                  authUser.profilePic ? (
                    <img
                      src={authUser.profilePic}
                      alt={authUser.fullName}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                  ) : (
                    <Avatar
                      fullName={authUser.fullName}
                      width="w-10"
                      height="h-10"
                      style="text-base"
                    />
                  )
                ) : (
                  selectedUser.profilePic ? (
                    <img
                      src={selectedUser.profilePic}
                      alt={selectedUser.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <Avatar
                      fullName={selectedUser.fullName}
                      width="w-10"
                      height="h-10"
                      style="text-base"
                    />
                  )
                )}
              </div>
            </div>

            <div className='chat-header mb-1'>
              <time className='text-xs opacity-50 ml-1'>
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className='chat-bubble flex flex-col'>
              {message.image && (
                <img src={message.image} alt="Attachment" className='sm:max-w-[200px] rounded-md mb-2' />
              )}

              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer