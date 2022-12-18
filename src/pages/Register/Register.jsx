import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.scss'
import axios from 'axios'

const Register = () => {

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

    try {
      await axios.post('http://localhost:5000/auth/register', inputs)
    } catch (error) {
      console.log(error)
      setError(error.response.data)
    }
  }

  console.log(inputs)

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
            <button>Login</button>
          </Link>
        </div>
        <div className='register-section'>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Username' name='username' onChange={handleChange} />
            <input type="email" placeholder='Email' name='email' onChange={handleChange} />
            <input type="password" placeholder='Password' name='password' onChange={handleChange}/>
            <input type="text" placeholder='Name' name='name' onChange={handleChange} />
            {error && <p>{error}</p>}
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register