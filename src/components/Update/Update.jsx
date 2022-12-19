import React, { useContext, useState } from 'react'
import './Update.scss'
import CloseIcon from '@mui/icons-material/Close';
import { makeRequest } from '../../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../context/authContext';
import coverImg from '../../assets/cover.jpg'
import avatar from '../../assets/avatar.jpg'

const Update = ({ onClose }) => {
  const { currentUser } = useContext(AuthContext)
  const [cover, setCover] = useState(null)
  const [profilePic, setProfilePic] = useState(null)
  const initialInputs = {
    name: currentUser.name,
    city: currentUser.city,
    website: currentUser.website
  }
  const [inputs, setInputs] = useState(initialInputs)

  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleClose = () => {
    clear()
    onClose()
  }
  
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (updateData) => {
      return makeRequest.put('/users', updateData)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user'])
      }
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    const coverUrl = cover ? "/uploads/" + await upload(cover) : currentUser.coverPic
    const profilePicUrl = profilePic ? "/uploads/" + await upload(profilePic) : currentUser.profilePic

    mutation.mutate({ ...inputs, coverPic: coverUrl, profilePic: profilePicUrl })
    
    handleClose()
  }
  
  const upload = async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await makeRequest.post('/upload', formData)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const clear = () => {
    setInputs(initialInputs)
    setCover(null)
    setProfilePic(null)
  }

  return (
    <div className='update'> 
      <h4 className='header'>Update</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor='coverInput'>
          Cover
          <input type="file" id='coverInput' onChange={e=>setCover(e.target.files[0])} />
          <img src={cover ? URL.createObjectURL(cover) : (currentUser.coverPic || coverImg)} />
        </label>
        <label htmlFor="profilePicInput">
          Profile
          <input type="file" id='profilePicInput' onChange={e=>setProfilePic(e.target.files[0])} />
          <img src={profilePic ? URL.createObjectURL(profilePic) : (currentUser.profilePic || avatar)} />
        </label>
        <input type="text" name='name' placeholder='Enter name...' onChange={handleChange} value={inputs.name} />
        <input type="text" name='city' placeholder='Enter city...' onChange={handleChange} value={inputs.city} />
        <input type="text" name='website' placeholder='Enter website...' onChange={handleChange} value={inputs.website} />
        <button>Update</button>
      </form>
      <button onClick={handleClose}><CloseIcon /></button>
    </div>
  )
}

export default Update