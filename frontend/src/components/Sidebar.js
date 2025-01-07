import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { ChatState } from '../context/ChatProvider';
const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user,setSelectedChat,chats,setChats } = ChatState();
  const handleSearch = async () => {
    try {
      setLoading(true);
 
      const res = await fetch(`http://localhost:5000/api/user?search=${search}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization : `Bearer ${user.token}`,
        }
      })
      console.log(res);
      const data = await res.json();
      if(data){
        setSearchResult(data);
      }
      else{
        setSearchResult(['no user found']);
      }
      setLoading(false);
      console.log(searchResult);
    }

    catch (err) {
      console.log(err);
    }
  }

  const accessChat = async(userId) => {
    try{
      setLoadingChat(true);
      const res=await fetch('http://localhost:5000/api/chat',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization : `Bearer ${user.token}`,
        },
        body: JSON.stringify({userId}),
      })
      const data=await res.json();
      console.log(data);
      if(!chats.find((c)=>c._id===data._id)){
        setChats([data,...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
    }
    catch(err){
      // console.log(err);
    } 
  }
  return (

    <div className={`fixed top-0 left-0 h-full w-[300px] shadow-lg transform transition-transform duration-700 ease-in-out bg-white `}>
      <div className='flex flex-col p-2'>
        <div className='flex justify-between'>
          <h2 className='pt-2 m-1'>Search User</h2>
          <button className='pb-2 ' onClick={(e) => {
            e.stopPropagation();
            console.log('clicked')
            setOpenSidebar(false)
          }}><IoClose /></button>

        </div>
        <div className='flex justify-between items-center'>
          <input type='text' placeholder='Search by name or email' value={search} onChange={(e) => setSearch(e.target.value)} className='border-teal-200 rounded-md p-1 m-1 bg-teal-100 w-[220px]'></input>

          <button className='p-1 bg-teal-200 rounded-md' onClick={handleSearch}>Submit</button>
        </div>
        <div className='flex flex-col h-screen overflow-y-auto'>

        
        {
          loading ? (
            <>
              Searching...
            </>
          ) : (
            

            
            searchResult?.map((user) => (
              <div key={user._id} user={user} onClick={() => {accessChat(user._id)
              console.log('clicked')}} className='flex 
                 gap-2 items-center bg-rose-50 mt-2 rounded-md p-1 '>
                <img width={30} src='user.png' alt=''></img>
                <div className='flex flex-col gap-1'>
                  <span>{user.name}</span>
                  Email: {user.email}
                </div>
              </div>
            ))
          )
        }
        </div>

      </div>

    </div>
  )
}

export default Sidebar