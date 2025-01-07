import React, { useEffect, useState } from 'react'
import LoginPage from './Authentication/LoginPage';
import SignUp from './Authentication/SignUp';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const HomePage = () => {
  const [login, setLogin] = useState(true);
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    // if (user) {
    //   history.push('/chats');
    // }
  }, [history])

  return (
    <div className='flex m-auto justify-center items-center rounded-md shadow-lg  bg-white border w-[33%]'>
      <div className='flex w-full flex-col justify-center items-center gap-2'>
        <div className=' flex p-2 text-2xl font-bold text-teal-700'><span className=' p-2 rounded-lg  cursor-pointer hover:transition-shadow'><span className='text-3xl bg-teal-100 p-2 border border-teal-100 border-gray-200 text-teal-700 shadow-lg rounded-full'>z<span className='text-[36px]'
        >z</span>Z</span></span></div>
        <div className='flex flex-col w-full justify-center'>
          <div className='flex m-auto w-[95%] justify-between gap-3 bg-slate-100 rounded-full '>
            <button className={` ${login ? "bg-teal-200" : ''} rounded-full w-[50%] text-gray-700 cursor-pointer font-bold p-2 text-sm`} onClick={() => setLogin(true)}  >Login</button>
            <button className={` ${!login ? 'bg-teal-200' : ''} rounded-full  w-[50%] text-gray-700 cursor-pointer font-bold p-2 text-sm`} onClick={() => setLogin(false)}
            >Sign Up</button>
          </div>

          {login ?
            <LoginPage /> :
            <SignUp />
          }
        </div>
      </div>
    </div>
  )
}

export default HomePage