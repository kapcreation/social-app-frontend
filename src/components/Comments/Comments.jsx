import React, { useContext, useEffect, useState } from 'react'
import './Comments.scss'
import { AuthContext } from '../../context/authContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { makeRequest } from '../../axios'
import avatar from '../../assets/avatarRounded.png'

const Comments = ({ postId, comments }) => {
  const { currentUser } = useContext(AuthContext)
  const queryClient = useQueryClient()
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const mutation = useMutation(
    (newComment) => {
      setIsLoading(true)

      return makeRequest.post('/comments', newComment)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', postId])

        setComment('')
        setIsLoading(false)
      }
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    mutation.mutate({ comment, postId })
  }

  return (
    <div className='comments'>
      <div className="input-box">
        <img src={currentUser.profilePic || avatar} alt="" />
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder='Write a comment...' 
            onChange={(e)=>setComment(e.target.value)} 
            value={comment}
          />
          <button disabled={isLoading}>{!isLoading ? 'Send' : 'Sending...'}</button>
        </form>
      </div>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={comment.profilePic || avatar} alt="" />
          <div className="text">
            <span>{comment.name}</span>
            <p>{comment.comment}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  )
}

export default Comments