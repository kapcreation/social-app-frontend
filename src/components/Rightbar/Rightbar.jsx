import React from 'react'
import './Rightbar.scss'

const Rightbar = () => {
  return (
    <div className='rightbar'>
      <div className="container">
        <div className="item">
          <span>Suggestions for you</span>
          <div className="user">
            <div className="info">
              <img src="/assets/img/users/4.jpg" alt="" />
              <span>Saba Holden</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="info">
              <img src="/assets/img/users/5.jpg" alt="" />
              <span>Kayla Keith</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>

        <div className="item">
          <span>Lastest Activities</span>

          <div className="user">
            <div className="info">
              <img src="/assets/img/users/1.jpg" alt="" />
              <p>
                <span>Hussain Petty</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="item">
          <span>Online Friends</span>

          <div className="user">
            <div className="info">
              <div className="img-container">
                <img src='/assets/img/users/1.jpg' alt="" />
                <div className="online"></div>
              </div>
              <span>Hussain Petty</span>
            </div>
          </div>

          <div className="user">
            <div className="info">
              <div className="img-container">
                <img src="/assets/img/users/2.jpg" alt="" />
                <div className="online"></div>
              </div>
              <span>Annie Frederick</span>
            </div>
          </div>

          <div className="user">
            <div className="info">
              <div className="img-container">
                <img src="/assets/img/users/3.jpg" alt="" />
                <div className="online"></div>
              </div>
              <span>Haaris Pena</span>
            </div>
          </div>

          <div className="user">
            <div className="info">
              <div className="img-container">
                <img src="/assets/img/users/4.jpg" alt="" />
                <div className="online"></div>
              </div>
              <span>Noah Clements</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Rightbar