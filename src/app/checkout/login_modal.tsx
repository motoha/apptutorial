
'use client'
import React, { createRef, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { redirect } from 'next/navigation';
import { useStateContext } from '../context/AppContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
 
  if (!isOpen) return null;

  
     
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const { setUser, setToken , setIdRole, idrole} = useStateContext();
  
 
  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    axiosClient.post('https://reqres.in/api/login', payload)
      .then(({ data }) => {
        console.log(data.token)
        setUser(data.user);
        setToken(data.token);
        setIdRole("2")
        console.log("id role" + idrole)
        localStorage.setItem('ROLE', "2");
        
       onClose
       
       
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          // setMessage(response.data.message);
        }
      });
  };
  

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={onSubmit} >
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">Username</label>
            <input
              type="text"
              id="username"
              ref={emailRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Login
            </button>
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;