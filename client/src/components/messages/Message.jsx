import React from 'react'
import {useAuthContext} from '../../context/AuthContext'
import {extractTime} from '../../utils/extractTime'
import useConversation from '../../zustand/useConversation';


const Message = ({message}) => {
  const  {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassname = fromMe ? 'chat-end' :'chat-start';
  const profilePic  = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubblebgColor = fromMe ? 'bg-blue-500' : '';
  //for a real time messages we add a shake class
  const shakeClass = message.shouldShake? 'shake' : '';

  return (
    <div className={`chat ${chatClassname}`}>
       <div className='chat-image avatar'>
         <div className='w-10 rounded-full'>
            <img alt='Tailwind CSS chat bubble component' src={profilePic}/>
         </div>
       </div>
       <div className={`chat-bubble text-white ${bubblebgColor} ${shakeClass} pb-2`}>{message.message}</div>
       <div className='chat-footer opacity-60 text-xs flex gap-1 items-center text-white '>{formattedTime}</div>
    </div>
  )
}

export default Message;
