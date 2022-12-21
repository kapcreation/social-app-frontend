import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { makeRequest } from "../axios";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
   JSON.parse(localStorage.getItem('user')) || null
  )

  const login = async (inputs, callback) => {
    try {
      const res = await makeRequest.post('/auth/login', inputs)
  
      setCurrentUser(res.data)
      
      callback(null, res.data)
    } catch (error) {
      console.log(error)
     
      callback(error.response.data, null)
    }
  }

  const register = async (inputs, callback) => {
    try {
      await makeRequest.post('/auth/register', inputs)

      login(inputs, (err, data) => {
        if (err) throw err
        
        callback(null, data)
      })
  
    } catch (error) {
      console.log(error)
      
      callback(error.response.data, null)
    }
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const update = async (updateData) => {
    try {
      await makeRequest.put('/users', updateData)

      setCurrentUser(prev=>({ ...prev, ...updateData }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, update }}>
      {children}
    </AuthContext.Provider>
  )
}