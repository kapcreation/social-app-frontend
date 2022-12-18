import React from 'react'
import Posts from '../../components/Posts/Posts'
import Stories from '../../components/Stories/Stories'
import './Home.scss'
import Share from '../../components/Share/Share'

const Home = () => {
  return (
    <div className='home'>
      <Stories />
      <Share />
      <Posts />
    </div>
  )
}

export default Home