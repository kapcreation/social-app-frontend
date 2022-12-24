import React, { useContext, useState, useEffect } from 'react'
import './Profile.scss'
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import avatar from '../../assets/avatarRounded.png'
import cover from '../../assets/cover.jpg'
import { Link, useParams } from 'react-router-dom';
import Posts from '../../components/Posts/Posts'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';
import Update from '../../components/Update/Update';
import preloader from '../../assets/preloader.gif'

const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  const { userId } = useParams();
  const [updateIsOpen, setUpdateIsOpen] = useState(false)

  const { isLoading: userIsLoading, error: userError, data: userData } = useQuery(['user'], () => (
    makeRequest.get('/users/' + userId).then((res) => {
      return res.data
    })
  ))

  const { isLoading: postsIsLoading, error: postsError, data: postsData } = useQuery(['posts'], () => (
    makeRequest.get(`/posts?context=profile&userId=${userId}`).then((res) => res.data)
  ))
  
  const { isLoading: relationshipIsLoading, error: relationshipError, data: relationship } = useQuery(['relationship'], () => (
    makeRequest.get('/relationships/' + userId).then((res) => {
      return res.data
    })
  ))

  const userIsCurrentUser = currentUser.id !== userData?.id

  const userIsFollowed = relationship?.includes(currentUser.id)
  
  const queryClient = useQueryClient()

  const mutation = useMutation(
    () => {
      if(!userIsFollowed) return makeRequest.post('/relationships', { userId: userData.id })
      return makeRequest.delete('/relationships?userId=' + userData.id)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['relationship'])
      }
    }
  )

  const handleFollow = () => {
    if(userData?.id) mutation.mutate()
  }

  if (userIsLoading) return <img src={preloader} className='preloader' />

  return (
    <div className='profile'>
      <div className="banner">
        <img src={userData.coverPic || cover} className="cover" />
      </div>
      <div className="container">
        <div className="information">
          <img src={userData.profilePic || avatar} className="profile-pic" />
          <div className="left">
            <FacebookTwoToneIcon />
            <LinkedInIcon />
            <InstagramIcon />
            <PinterestIcon />
            <TwitterIcon />
          </div>
          <div className="center">
            <h1>{userData.name}</h1>
            <div className="links">
              <Link to='/'>
                <PlaceIcon />
                {userData.city || 'No info'}
              </Link>
              <Link to='/'>
                <LanguageIcon />
                {userData.website || 'No info'}
              </Link>
            </div>
            {userIsCurrentUser ? <button onClick={handleFollow}>{!userIsFollowed ? 'Follow' : 'Following'}</button> : <button onClick={()=>setUpdateIsOpen(true)}>Update</button>}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>

        {!postsIsLoading ? <Posts data={postsData} /> : <img src={preloader} className='preloader' />}
      </div>

      {updateIsOpen && <Update onClose={()=>setUpdateIsOpen(false)} />}
    </div>
  )
}

export default Profile