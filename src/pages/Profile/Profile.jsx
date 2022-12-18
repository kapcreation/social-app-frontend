import React, { useContext } from 'react'
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

const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  const { userId } = useParams();

  const { isLoading, error, data: user } = useQuery(['user'], () => (
    makeRequest.get('/users/' + userId).then((res) => {
      return res.data
    })
  ))
  
  const { isLoading: relationshipIsLoading, error: relationshipError, data: relationship } = useQuery(['relationship'], () => (
    makeRequest.get('/relationships/' + userId).then((res) => {
      return res.data
    })
  ))

  console.log(relationship)

  const userIsCurrentUser = currentUser.id !== user?.id

  const userIsFollowed = relationship?.includes(currentUser.id)
  
  const queryClient = useQueryClient()

  const mutation = useMutation(
    () => {
      if(!userIsFollowed) return makeRequest.post('/relationships', { userId: user.id })
      return makeRequest.delete('/relationships?userId=' + user.id)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['relationship'])
      }
    }
  )

  const handleFollow = () => {
    if(user?.id) mutation.mutate()
  }


  if (isLoading) return 'Loading...'

  return (
    <div className='profile'>
      <div className="banner">
        <img src={user.coverPic || cover} className="cover" />
      </div>
      <div className="container">
        <div className="information">
          <img src={user.profilePic || avatar} className="profile-pic" />
          <div className="left">
            <FacebookTwoToneIcon />
            <LinkedInIcon />
            <InstagramIcon />
            <PinterestIcon />
            <TwitterIcon />
          </div>
          <div className="center">
            <h1>{user.name}</h1>
            <div className="links">
              <Link to='/'>
                <PlaceIcon />
                {user.city}
              </Link>
              <Link to='/'>
                <LanguageIcon />
                {user.website}
              </Link>
            </div>
            {userIsCurrentUser ? <button onClick={handleFollow}>{!userIsFollowed ? 'Follow' : 'Following'}</button> : <button>Update</button>}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>

        <Posts userId={userId} />
      </div>
    </div>
  )
}

export default Profile