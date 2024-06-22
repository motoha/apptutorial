"use client"


import { createContext, ReactNode, useContext, useEffect, useState } from "react";

 
 

interface User {
  // Define your user properties here
  // For example:
  // id: number;
  // name: string;
  // etc.
}

interface ContextType {
  currentUser: User | null;
  token: string | null;
  idrole: string | null;
  notification: string | null;
  setUser: (user: User) => void;
  setToken: (token: string | null) => void;
  setIdRole: (idrole:  string | "") => void;
  setNotification: (message: string) => void;
}

const StateContext = createContext<ContextType>({
  currentUser: null,
  token: null,
  idrole : "",
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setIdRole : ()  => {},
  setNotification: () => {},
});


interface ContextProviderProps {
  children: ReactNode;
}



export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [token, _setToken] = useState<string | null>(null);
  const [notification, _setNotification] = useState<string>('');
  const [idrole, setIdRole] = useState<string | null>(null);

  
  useEffect(() => {
    // Initialize state from localStorage after component mounts
    _setToken(localStorage.getItem('ACCESS_TOKEN'));
    setIdRole(localStorage.getItem('ROLE'));
  }, []);
  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  const setNotification = (message: string) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification('');
    }, 5000);
  };
 
  return (
    <StateContext.Provider
      value={{
        // ADD VALUES HERE YOU WANT TO PASS
        currentUser: user,
        setUser,
        idrole,
        setIdRole,

        token,
        setToken,

        notification,
        setNotification,
        
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);