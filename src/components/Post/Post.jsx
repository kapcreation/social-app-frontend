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
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const { isLoading: likesIsLoading, error: likesError, data: likesData } = useQuery(['likes', post.id], () => (
    makeRequest.get('/likes?postId=' + post.id).then((res) => {
      return res.data
    })
  ))
  
  const { isLoading: commentsIsLoading, error: commentsError, data: commentsData } = useQuery(['comments'], () => (
    makeRequest.get('/comments?postId=' + post.id).then((res) => {
      return res.data
    })
  ))

  const isLiked = likesData?.includes(currentUser.id)
  const isOwner = post.userId === currentUser.id
  
  const queryClient = useQueryClient()

  const likesMutation = useMutation(
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

  const postsMutation = useMutation(
    () => {
      return makeRequest.delete('/posts/' + post.id)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts'])
      }
    }
  )

  const handleLike = () => {
   likesMutation.mutate()
  }

  const openComments = () => {
    setCommentsIsOpen((commentsIsOpen)=>!commentsIsOpen)
    setFocus(post.id)
  }

  const toggleMenu = () => {
    setMenuIsOpen(prev=>!prev)
  }

  const handleDelete = () => {
    postsMutation.mutate()
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
        {isOwner && <MoreHorizIcon className='btn' onClick={toggleMenu} />}
        {menuIsOpen && <div className='menu'><button onClick={handleDelete}>Delete</button></div>}
      </div>
      <div className="body">
        <p>{post.desc}</p>
        {post.img && <img src={post.img} />}
      </div>
      <div className="footer">
        {!likesIsLoading && <button className="btn" onClick={handleLike}>
          {isLiked ? <FavoriteOutlinedIcon  /> : <FavoriteBorderOutlinedIcon />}
          {likesData.length} Likes
        </button>}
        {!commentsIsLoading && <button className="btn" onClick={openComments}>
          <TextsmsOutlinedIcon />
          {commentsData.length} Comments
        </button>}
        <button className="btn">
          <ShareOutlinedIcon />
          Share
        </button>
      </div>
      {commentsIsOpen && <Comments postId={post.id} comments={commentsData} />}
    </div>
  )
}

export default Post