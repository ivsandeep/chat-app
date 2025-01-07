import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { ChatState } from '../../context/ChatProvider';
const SignUp = () => {
  const {setUser}=ChatState();
  const notify = () => toast('Please select an image!')
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    // pic: ''
  })

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
    console.log(show);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // const {name,email, password}=formData;
    setLoading(true);
    try {

      const res = await fetch('http://localhost:5000/api/user', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data=await res.json();
      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      setUser(data);
      history.push('/chats');
    } catch (err) {
      console.log('Signup Failed');
    }
    setFormData({
      name: '',
      email: '',
      password: ''
    })
  }
  const postDetails = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    }
    if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
      const data = new FormData();
      data.append('file', pic);
      data.append('upload_preset', 'chat-app');
      data.append('cloud_name', 'sandy-dev')
      fetch()
    }
  }
  // const
  return (
    <div>
      <form className='flex flex-col gap-4 p-3 relative '>
        <label htmlFor='name' className=''>
          <span className='font-bold text-gray-800 text-sm'>Name:</span> <span className='text-red-600 font-bold'>*</span>
          <input className='p-1 w-full rounded-[6px] bg-teal-50' id='name'
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter your name'></input>
        </label>
        <label htmlFor='email'>
          <span className='font-bold text-gray-800 text-sm' >Email:</span>  <span className='text-red-600 font-bold'>*</span>
          <input className='p-1 w-full rounded-[6px] bg-teal-50' placeholder='Enter your email' id='email'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor='password'>
          <span className='font-bold text-sm text-gray-800'>Password:</span> <span className='text-red-600 font-bold'>*</span>
          <input className='p-1 w-full rounded-[6px] bg-teal-50' placeholder='Password' id='password'
            type={show ? 'text' : 'password'}
            name='password'
            value={formData.password}
            onChange={handleChange}
          >
          </input>
          <button className='absolute right-4 bottom-[136px] text-[10px] text-red-500 font-bold' onClick={handleClick}>{show ? 'Hide' : 'Show'}</button>
        </label>
        {/* <label>
          Upload your picture:
          <input className='text-[14px] text-gray-500'
            type='file'
            name='pic'
            value={formData.pic}
            onChange={handleChange}
          ></input>
        </label> */}
        <button onClick={handleSubmit} className='w-full bg-red-600 hover:bg-red-700 text-gray-50 text-bold rounded-xl p-1  cursor-pointer'>Register</button>
      </form>
    </div>
  )
}

export default SignUp