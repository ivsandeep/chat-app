import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider';

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats ,notificationList, setNotificationList,notification, setNotification,messages, setMessages} = ChatState();
  const getSender = (loggedUser, users) => {
    // if(selectedChat)
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
  }


  const trimMessage = (message, limit) => {
    if (message.length > limit) {
      return message.slice(0, limit) + " ..."; 
    }
    return message; 
  };
  const fetchChats = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        }
      })
      const data = await res.json();
      // console.log(data)
      setChats(data);
      // console.log(chats)
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
    fetchChats();
  },[chats])
  return (
    <div className='bg-white p-1 rounded-lg w-[35%]'>
      <div className='flex justify-between p-1'>
        <h1 className='text-lg font-bold pl-2'>My Chats</h1>
        <div className=' bg-gray-200 p-1 rounded-md flex items-center gap-1 text-xs cursor-pointer'>New Group Chat <b className='pl-1 pr-1 bg-gray-400 rounded-md'>+</b></div>
      </div>
      <hr className='mt-2 mb-2'></hr>
      {chats &&
        chats.map((chat) => (
          <div onClick={() => setSelectedChat(chat)} key={chat._id} className={`${selectedChat?._id === chat._id ? "bg-rose-200" : "bg-gray-200"} p-2 m-1 rounded-lg cursor-pointer`}>
            <div className='font-semibold flex gap-2'>
              <img src='user.png' alt='' width={40}></img>
              <div className='flex flex-col capitalize'>
                {!chat.isGroupChat ? (

                  getSender(loggedUser,chat.users)
               
                ) : (
                  <div></div>
                )}
                <div className='text-xs text-gray-600'>{
                    chat.latestMessage && <div>
                      {trimMessage(chat.latestMessage.content,50)}
                    </div>

                }</div>

              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default MyChats