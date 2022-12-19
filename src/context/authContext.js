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
  
      update(res.data)
      
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

        update(data)
        callback(null, data)
      })
  
    } catch (error) {
      console.log(error)
      
      callback(error.response.data, null)
    }
  }

  const update = (updateData) => {
    setCurrentUser(prev=>({ ...prev, ...updateData }))
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, login, register }}>
      {children}
    </AuthContext.Provider>
  )
}