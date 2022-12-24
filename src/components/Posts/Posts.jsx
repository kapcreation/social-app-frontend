import React, { useState } from 'react'
import './Posts.scss'
import Post from '../Post/Post';

const Posts = ({ data }) => {

  const [focus, setFocus] = useState(null)

  return (
    <div className='posts'>
      {data.map((post) => (<Post post={post} focus={focus} setFocus={setFocus} key={post.id} />))}
    </div>
  )
}

export default Posts