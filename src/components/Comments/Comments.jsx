import React, { useContext, useEffect, useState } from 'react'
import './Comments.scss'
import { AuthContext } from '../../context/authContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { makeRequest } from '../../axios'

const Comments = ({ postId, comments }) => {

  const { currentUser } = useContext(AuthContext)

  const queryClient = useQueryClient()

  const [comment, setComment] = useState('')

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post('/comments', newComment)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments'])
      }
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    mutation.mutate({ comment, postId })

    setComment('')
  }

  return (
    <div className='comments'>
      <div className="input-box">
        <img src={currentUser.profilePic} alt="" />
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder='Write a comment...' 
            onChange={(e)=>setComment(e.target.value)} 
            value={comment}
          />
          <button>Send</button>
        </form>
      </div>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={comment.profilePic} alt="" />
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