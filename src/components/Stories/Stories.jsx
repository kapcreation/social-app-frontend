import React, { useContext } from 'react'
import './Stories.scss'
import { AuthContext } from '../../context/authContext'
import avatar from '../../assets/avatar.jpg'

const Stories = () => {
  const { currentUser } = useContext(AuthContext)
  
  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "Hussain Petty",
      img: "/assets/img/covers/1.jpg",
    },
    {
      id: 2,
      name: "Annie Frederick",
      img: "/assets/img/covers/2.jpg",
    },
    {
      id: 3,
      name: "Haaris Pena",
      img: "/assets/img/covers/3.jpg",
    },
    {
      id: 4,
      name: "Noah Clements",
      img: "/assets/img/covers/4.jpg",
    },
  ];

  return (
    <div className='stories'>
      <div className="story">
        <img src={currentUser.profilePic || avatar} />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>

      {stories.map(story => (      
        <div className="story" key={story.id}>
          <img src={story.img} />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories