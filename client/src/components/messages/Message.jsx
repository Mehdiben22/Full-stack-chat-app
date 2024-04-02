import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
       <div className='chat-image avatar'>
         <div className='w-10 rounded-full'>
            <img alt='Tailwind CSS chat bubble component'
                 src='https://cdn1.iconfinder.com/data/icons/communication-glyph-2/48/Communication-Glyph-4-512.png'
            />
         </div>
       </div>
       <div className={`chat-bubble text-white bg-blue-500`}>Hi ! what is upp ?</div>
       <div className='chat-footer opacity-60 text-xs flex gap-1 items-center text-white '>10:45</div>
    </div>
  )
}

export default Message
