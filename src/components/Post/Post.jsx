import React, { useEffect, useState } from 'react'
import './Post.scss'
import { Link } from 'react-router-dom'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Comments from '../Comments/Comments';
import moment from 'moment'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { makeRequest } from '../../axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import avatar from '../../assets/avatarRounded.png'

const Post = ({ post, focus, setFocus }) => {
  const { currentUser } = useContext(AuthContext)
  const [commentsIsOpen, setCommentsIsOpen] = useState(false)

  const { isLoading, error, data } = useQuery(['likes', post.id], () => (
    makeRequest.get('/likes?postId=' + post.id).then((res) => {
      return res.data
    })
  ))

  const isLiked = data?.includes(currentUser.id)
  
  const queryClient = useQueryClient()

  const mutation = useMutation(
    () => {
      if(!isLiked) return makeRequest.post('/likes', { postId: post.id })
      return makeRequest.delete('/likes?postId=' + post.id)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['likes'])
      }
    }
  )

  const handleLike = () => {
    mutation.mutate()
  }

  const handleComments = () => {
    setCommentsIsOpen((commentsIsOpen)=>!commentsIsOpen)
    setFocus(post.id)
  }

  useEffect(() => {
    if(commentsIsOpen) {
      if(focus !== post.id) setCommentsIsOpen(false)
    }
  }, [focus])

  return (
    <div className='post'>
      <div className="header">
        <Link to={`/profile/${post.userId}`} className="user">
          <img src={post.profilePic || avatar} />
          <span className='name'>{post.name}</span>
          <span className="date">{moment(post.createdAt).fromNow()}</span>
        </Link>
        <MoreHorizIcon className='btn' />
      </div>
      <div className="body">
        <p>{post.desc}</p>
        {post.img && <img src={post.img} />}
      </div>
      <div className="footer">
        {!isLoading && <button className="btn" onClick={handleLike}>
          {isLiked ? <FavoriteOutlinedIcon  /> : <FavoriteBorderOutlinedIcon />}
          {data.length} Likes
        </button>}
        <button className="btn" onClick={handleComments}>
          <TextsmsOutlinedIcon />
          104 Comments
        </button>
        <button className="btn">
          <ShareOutlinedIcon />
          Share
        </button>
      </div>
      {commentsIsOpen && <Comments postId={post.id} />}
    </div>
  )
}

export default Post