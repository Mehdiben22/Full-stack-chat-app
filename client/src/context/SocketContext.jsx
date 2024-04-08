import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'
//inform all the composants in the app about the socketio
 const SocketContext = createContext();

 //the hook useSocketContext is created to give the hand to other composants in the app to access to the socket composant
 export const useSocketContext = () => {
    return useContext(SocketContext);
 };

 //the provider is created to give the socket context to other composant in the app
export const SocketContextProvider = ({children}) => {
    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect(()=> {
        //if a user is ahtentified a socket connexion is established 
     if(authUser) {
        const socket = io("http://localhost:7000",{
            query : {
                userId : authUser._id   
            }
        })
        setSocket(socket);
        //onlineusers from the server 
        socket.on("getOnlineUsers",(users)=> {
            setOnlineUsers(users)
        })
        //after that we close the connection 
        return ()=> socket.close();
     }else  {
        if(socket) {
            socket.close();
            setSocket(null);
        }
     }
    },[authUser]);
    return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>;
};