import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { ChatState } from '../context/ChatProvider';
import { IoClose } from "react-icons/io5";
import { useHistory } from 'react-router-dom';
import Sidebar from './Sidebar';
const SideDrawer = () => {
    const history = useHistory();
    
    const {notification, setNotification,notificationList, setNotificationList}=ChatState()
    
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false)
    const { user,setSelectedChat } = ChatState();
    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        setSelectedChat('');
        history.push('/');
    }

    const getSender = (loggedUser, users) => {
        // if(selectedChat)
        return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
      }

    // const 
    return (

        <div className='flex w-[100%] relative'>
            <div className='flex justify-between gap-5 w-[100%] bg-tealNew items-center p-2 shadow-lg'>
                <div className='flex items-center gap-3 border-gray-400 bg-green-50 p-2 rounded-lg w-[100px] justify-between cursor-pointer' onClick={() => { 
                    // console.log(openSidebar) 
                    ;setOpenSidebar(true);

                 }}>

                    <span >Search</span>
                    <IoSearch />
                    
                    {openSidebar && 
                        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
                    }
                </div>
                <div>
                    <h2>zZZ</h2>
                </div>
                <div className='flex items-center gap-5 relative'>
                    <IoMdNotifications size={22} className='text-gray-100 cursor-pointer' onClick={()=>setNotificationList(!notificationList)}/>
                    {notification.length>0 ? <span className='w-2 h-2 rounded-full bg-red-500 absolute top-[10px] left-[11px]'></span>: <></>}
                    {notificationList && (<div className='bg-red-100  rounded-md absolute w-[180px] justify-center flex flex-col p-1  top-[40px] right-[20px] text-sm '>
                    {!notification.length && "No new messages"}
                    {notification.map((notif)=>(
                        <div className='border-b-[1px] border-gray-200' key={notif._id} onClick={()=>{setSelectedChat(notif.chat)
                        setNotificationList(!notificationList)
                        setNotification(notification.filter((n)=>n!==notif))}}>
                            New Message from <span className='font-semibold capitalize '>{getSender(user,notif.chat.users)}</span> 
                        </div>
                    ))}
                        
                    </div>)}
                    <div className='flex items-center gap-2 bg-green-50 rounded-lg p-1 cursor-pointer' onClick={() => { setOpenProfileMenu(!openProfileMenu) }}>
                        <img className='bg-white w-[30px] rounded-full' src='user.png' alt=''></img>
                        <RiArrowDownSLine />
                    </div>
                    {openProfileMenu &&
                        <div className='bg-white p-1 absolute flex top-[50px] right-2 rounded-md text-sm cursor-pointer shadow-lg'>
                            <ol className='w-[100px]'>
                                <li className='hover:text-slate-600 p-[2px]' onClick={() => setOpenProfile(!openProfile)}>My Profile</li>
                                <hr className='mt-1 mb-1'></hr>
                                <li className='hover:text-slate-600' onClick={() => logoutHandler()}>Logout</li>
                            </ol>
                        </div>
                    }
                    {openProfile &&
                        <div className='flex justify-center items-center fixed inset-0 bg-opacity-50 bg-gray-800 shadow-full rounded-md p-2 flex-col'>
                            <div className='bg-white p-6 rounded-lg shadow-full flex flex-col items-center relative'>
                                <img className='w-[100px] ' src='user.png' alt=''></img>
                                <span> <b>Email:</b>{user.email}</span>
                                <span> <b>Name:</b> {user.name}</span>
                                <button className='absolute top-0 right-1 pt-1' onClick={() => { setOpenProfile(!openProfile) }}><IoClose size={20} />
                                </button>
                            </div>
                        </div>
                    }

                </div>

            </div>
        </div >
    )
}

export default SideDrawer