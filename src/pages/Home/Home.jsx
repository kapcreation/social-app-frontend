import React from 'react'
import Posts from '../../components/Posts/Posts'
import Stories from '../../components/Stories/Stories'
import './Home.scss'
import Share from '../../components/Share/Share'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import preloader from '../../assets/preloader.gif'

const Home = () => {

  const { isLoading, error, data } = useQuery(['posts'], () => {
    return makeRequest.get('/posts?context=feed').then((res) => res.data)
    //return makeRequest.get(`/posts?context=profile&userId=${userId}`).then((res) => res.data)
  })

  return (
    <div className='home'>
      <Stories />
      <Share />
      {!isLoading ? <Posts data={data} /> : <img src={preloader} className='preloader' />}
    </div>
  )
}

export default Home