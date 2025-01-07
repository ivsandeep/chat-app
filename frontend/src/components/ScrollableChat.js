import React, { useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { useRef, useEffect } from 'react'




const ScrollableChat = ({ messages,selectedChat }) => {
    const { user } = ChatState()


    const messagesEndRef = useRef(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: isInitialLoad ? "auto" : "smooth",
      block: "end", });
    };

    useEffect(() => {
        scrollToBottom();
        setIsInitialLoad(false)
    }, [messages]); 
    useEffect(() => {
        setIsInitialLoad(true); // Reset when switching chats
      }, [selectedChat]);
    // const isSameSender = (messages, m, i, userId) => {
    //     return (
    //         i < messages.length - 1 &&
    //         (
    //             messages[i + 1].sender._id !== m.sender._id ||
    //             messages[i + 1].sender._id === undefined
    //         ) &&
    //         messages[i].sender._id !== userId
    //     )
    // }
    // const isLastMessage = (messages, i, userId) => {
    //     return (
    //         i < messages.length - 1 &&
    //         (
    //             messages[messages.length - 1].sender._id !== userId &&
    //             messages[messages.length - 1].sender._id
    //         )
    //     )
    // }

    // const isSameSenderMargin = (message, m, i, userId) => {
    //     if (i < messages.length - 1 &&
    //         (
    //             messages[i + 1].sender._id !== m.sender._id ||
    //             messages[i + 1].sender._id === undefined
    //         ) &&
    //         messages[i].sender._id !== userId)
    //         return 33;
    //     else if (
    //         (i < messages.length - 1 &&

    //             messages[i + 1].sender._id !== m.sender._id &&
    //             messages[i].sender._id !== userId
    //         ) ||
    //         (i === messages.length - 1 && messages[i].sender._id !== userId))
    //         return 0;
    //     else return "auto";
    // }

    // const isSameUser = (messages, m, i) => {
    //     return i > 0 && messages[i - 1].sender._id === m.sender._id;
    // }

    return (
        <div className='flex flex-col w-full'>
            {messages?.map((m) => (
                <div className={`flex ${m.sender._id === user._id ? " justify-end" : "justify-start"} my-2 gap-2 items-center`}>
                    {m.sender._id !== user._id ? <img className='w-[25px] h-[25px]' src='user.png' alt='' /> : <></>}
                    <div className={`${m.sender._id === user._id ? "bg-blue-500" : "bg-teal-500"} px-2 py-1  rounded-lg text-white max-w-[80%] break-words`}>
                        {m.content}
                        <div ref={messagesEndRef}></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ScrollableChat