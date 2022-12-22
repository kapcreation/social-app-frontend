import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import './Login.scss'

const Login = () => {
  const { login } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
 
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    
    login(inputs, (err, data) => {
      if (err) setError(err)
      setIsLoading(false)
    })
  }

  return (
    <div className='login'>
      <div className='card'>
        <div className='register-section'>
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
          <span>Don't you have an account?</span>
          <Link to='/register'>
            <button>Register</button>
          </Link>
        </div>
        <div className='login-section'>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Username' name='username' onChange={handleChange} required />
            <input type="password" placeholder='Password' name='password' onChange={handleChange} required />
            {error && <p>{error}</p>}
            <button disabled={isLoading}>{!isLoading ? 'Log In' : 'Loading...'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login