import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ChatState } from '../../context/ChatProvider'
const LoginPage = () => {
    const { user, setUser } = ChatState();
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
    })
    const history = useHistory();
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
        try {
            const res = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            }
            )
            const data = await res.json();
            console.log(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            //   setLoading(false);
            history.push('/chats');
            console.log("Login Successful!")
        }
        catch (err) {
            console.log("Login failed!")
        }

        setFormData({
            email: '',
            password: '',
        })

    }
    const [show, setShow] = useState(false);
    const handleClick = (e) => {
        e.preventDefault();
        setShow(!show);
        // console.log(show);
    }
    return (
        <div>
            <form className='relative flex flex-col gap-4 p-3'>
                <label htmlFor='email'>
                    <span className='font-bold text-sm text-gray-800'>Email:</span> <span className='text-red-600 font-bold'>*</span>
                    <input className='p-1 w-full rounded-[6px] bg-teal-50' id='email' required
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Enter your email'>

                    </input>
                </label>
                <label htmlFor='password'>
                    <span className='font-bold text-sm text-gray-800'>Password:</span> <span className='text-red-600 font-bold'>*</span>
                    <input className='p-1 w-full rounded-[6px] bg-teal-50 ' placeholder='Enter your password' id='password' required
                        type={show ? 'text' : 'password'}
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    ></input>
                    <button className='absolute right-4 bottom-[68px] text-[10px] text-red-500 font-bold' onClick={handleClick}>{show ? 'Hide' : 'Show'}</button>
                </label>
                <button onClick={handleSubmit} className='w-full bg-red-600 hover:bg-red-700 text-gray-50 text-bold rounded-xl p-1  cursor-pointer'>Login</button>
            </form>
        </div>
    )
}

export default LoginPage