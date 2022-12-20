import React, { useState } from 'react'
import './Posts.scss'
import Post from '../Post/Post';
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'

const Posts = ({ userId }) => {

  const { isLoading, error, data } = useQuery(['posts'], () => {
    if(!userId) return makeRequest.get('/posts?context=feed').then((res) => res.data)
    return makeRequest.get(`/posts?context=profile&userId=${userId}`).then((res) => res.data)
  })

  const [focus, setFocus] = useState(null)

  return (
    <div className='posts'>
      {
        error 
        ? 'Something went wrong!' 
        : isLoading 
        ? 'Loading...' 
        : data.map((post) => (<Post post={post} focus={focus} setFocus={setFocus} key={post.id} />))
      }
    </div>
  )
}

export default Posts