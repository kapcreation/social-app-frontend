import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.scss'
import { AuthContext } from '../../context/authContext'

const Register = () => {
  const { register } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    name: ''
  })

  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    register(inputs, (err, data) => {
      if (err) setError(err)
      setIsLoading(false)
    })
  }

  return (
    <div className='register'>
      <div className='card'>
        <div className='login-section'>
          <h1>KAP Social.</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
          <span>Do you have an account?</span>
          <Link to='/login'>
            <button>Log In</button>
          </Link>
        </div>
        <div className='register-section'>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Username' name='username' onChange={handleChange} required />
            <input type="email" placeholder='Email' name='email' onChange={handleChange} required />
            <input type="password" placeholder='Password' name='password' onChange={handleChange} required />
            <input type="text" placeholder='Name' name='name' onChange={handleChange} required />
            {error && <p>{error}</p>}
            <button disabled={isLoading}>{!isLoading ? 'Register' : 'Loading...'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register