import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import './Login.scss'

const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    login(inputs, (err, data) => {
      if (err) return setError(err)
      navigate('/')
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
            <input type="text" placeholder='Username' name='username' onChange={handleChange} />
            <input type="password" placeholder='Password' name='password' onChange={handleChange} />
            {error && <p>{error}</p>}
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login