import  { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation';
import notificationsound from '../assets/sound/notification.mp3'

const useListenMessages = () => {
const {socket} = useSocketContext();
const {messages, setMessages} = useConversation();

useEffect(()=> {
socket?.on("newMessage",(newMessage)=>{
    newMessage.shouldShake = true;
    const sound = new Audio(notificationsound);
    sound.play();
    setMessages([...messages,newMessage])
})
//listen to the event once!
return () => socket?.off("newMessage")
},[socket,setMessages,messages])
}

export default useListenMessages
