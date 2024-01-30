import React, { useState, createContext } from 'react';

export const loginContext = createContext();

export default function LoginStatusProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <loginContext.Provider value={{ loginStatus, setLoginStatus }}>
      {children}
    </loginContext.Provider>
  );
}
