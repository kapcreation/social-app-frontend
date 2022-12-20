import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
   JSON.parse(localStorage.getItem('user')) || null
  )

  const login = async (inputs, callback) => {
    try {
      const res = await axios.post('http://localhost:5000/auth/login', inputs, {
        withCredentials: true
      })
  
      setCurrentUser(res.data)
      
      callback(null, res.data)
    } catch (error) {
      console.log(error)
     
      callback(error.response.data, null)
    }
  }

  const register = async (inputs, callback) => {
    try {
      await axios.post('http://localhost:5000/auth/register', inputs, {
        withCredentials: true
      })

      login(inputs, (err, data) => {
        if (err) throw err
        
        callback(null, data)
      })
  
    } catch (error) {
      console.log(error)
      
      callback(error.response.data, null)
    }
  }

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout', {
        withCredentials: true
      })
    } catch (error) {
      console.log(error)
    }

    setCurrentUser(null)
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}