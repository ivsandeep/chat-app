import React, { useContext, useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client'
const ENDPOINT='http://localhost:5000'
let socket, selectedChatCompare;
const ChatBox = () => {
  const { user, selectedChat, setSelectedChat ,notification, setNotification, messages, setMessages} = ChatState();
  
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected]=useState(false);
  const [typing, setTyping]=useState(false);
  const [isTyping, setIsTyping]=useState(false);
  useEffect(()=>{
    socket= io(ENDPOINT);
    socket.emit("setup",user)
    socket.on('connected',()=>setSocketConnected(true))
    socket.on('typing',()=>setIsTyping(true))
    socket.on('stop-typing',()=>setIsTyping(false))
  },[])

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const res = await fetch(`http://localhost:5000/api/message/${selectedChat._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      })
      const data = await res.json();
      console.log(data);
      setMessages(data);
      socket.emit("join-chat", selectedChat._id);
    }
    catch (err) {
      console.log(err);
    }
  }
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      const messageData = {
        content: newMessage,
        chatId: selectedChat._id
      }
      try {
        const res = await fetch(`http://localhost:5000/api/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(messageData)
        })
        const data = await res.json();
        console.log(data);
        setNewMessage('')
        socket.emit('new-message',data)
        setMessages([...messages, data])
        // fetchChats();
      }
      catch (err) {
        console.log(err);
      }
    }
  }

 
  const typingHandler = (e) => {
    setNewMessage(e.target.value)
    //Typing indicator logic
    if(!socketConnected) return;
    if(!typing){
      setTyping(true);
      socket.emit('typing',selectedChat._id);
    }

    let lastTypingTime= new Date().getTime();
    var timerLength=3000;
    setTimeout(() => {
        let timeNow=new Date().getTime();
        var timeDiff=timeNow-lastTypingTime;
        if(timeDiff>=timerLength && typing){
          socket.emit("stop-typing",selectedChat._id)
          setTyping(false)
        }
    }, timerLength);
  }

  
  
  useEffect(() => {
    fetchMessages();
    selectedChatCompare=selectedChat;
  }, [selectedChat])

  useEffect(()=>{
    socket.on('message-received',(newMessage)=>{
    if(!selectedChatCompare || selectedChatCompare._id!==newMessage.chat._id){
      if(!notification.includes(newMessage)){
        setNotification([newMessage,...notification])
      }
    }
    else{
      setMessages([...messages,newMessage]);
    }
    }
  )
  })

  return (
    <div className='w-[65%] flex flex-col justify-evenly p-1 rounded-lg bg-white '>
      <div className='flex p-2 gap-2 items-center justify-start bg-white'>
        {selectedChat ? (<img src='user.png' width={30} alt=''></img>) : (<></>)}
        <span className='font-semibold capitalize'>{selectedChat && selectedChat.users && selectedChat.users.length > 0 
    ? selectedChat.users[0]._id !== user._id 
      ? selectedChat.users[0].name 
      : selectedChat.users[1].name 
    : ""}</span>
      </div>
      <div className='bg-red-200 m-2 h-[90%] rounded-lg flex'>
        {!selectedChat ?
          <div className='flex justify-center items-center w-full text-xl'>
            Click on a user to start chatting...
          </div>
          : (
            <div className=' w-full'>
              {loading ?
                (<div></div>)
                : (
                  <div className=' flex flex-col gap-1 p-2 w-full h-full'>
                    <div className='bg-red-200 rounded-md w-full h-[88%] overflow-y-auto  overflow-x-hidden'>
                    <ScrollableChat messages={messages} selectedChat={selectedChat}/>

                    </div>
                    <div className=' w-[99%]'>
                      {/* {isTyping? <div>...</div>:(<></>)} */}
                      <input onKeyDown={(e) => sendMessage(e)} className='mt-3 w-full rounded-full p-2 m-1' placeholder='Enter a message...' onChange={typingHandler} value={newMessage}></input>
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ChatBox