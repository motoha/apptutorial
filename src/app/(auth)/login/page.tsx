
"use client"
import axiosClient from '@/app/api/axiosClient';
import React, { createRef, useState } from 'react'
 
import { redirect } from 'next/navigation';
import { useStateContext } from '@/app/context/AppContext';
const SignIn: React.FC = () => {

    
     
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const { setUser, setToken , setIdRole, idrole} = useStateContext();
  const [message, setMessage] = useState<string | null>(null);
 
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
        
        redirect('/')
       
       
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };
  
  
  return (
    <>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={onSubmit} className="space-y-6"   >
    {message &&
          <div className="alert">
            <p>{message}</p>
          </div>
        }
      <div>
        <label   className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" name="email"  type="email" ref={emailRef}   required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label  className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <input id="password" name="password"  type="password" ref={passwordRef}  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
    </p>
  </div>
</div>
    </>
  )
}
 
export default SignIn;