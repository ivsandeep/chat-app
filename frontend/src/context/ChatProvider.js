import { createContext, useContext, useEffect, useState } from 'react'
import {} from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ChatContext=createContext();

const ChatProvider=({children})=>{
    const [user,setUser]=useState();
    const [selectedChat,setSelectedChat]=useState('');
    const [chats,setChats]=useState([]);
    const [notification, setNotification]=useState([])
    const [messages, setMessages] = useState([]);
    const [notificationList, setNotificationList]=useState(false);
    const history=useHistory();

    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);

        if(!userInfo){
            history.push('/');
        }
    },[history])
    return (
        <ChatContext.Provider value={{user,setUser, selectedChat,setSelectedChat,chats,setChats,notification, setNotification, messages, setMessages,notificationList, setNotificationList}}>
            {children}
        </ChatContext.Provider>
    )
}


export const ChatState=()=>{
    return useContext(ChatContext);
}

export default ChatProvider;