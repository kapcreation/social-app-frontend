import React, { useContext, useEffect, useState } from 'react'
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import avatar from '../../assets/avatarRounded.png'
import './Navbar.scss'
import { Link, useLocation } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from '../../redux/actions/modal';

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext)
  const { currentUser, logout } = useContext(AuthContext)
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const location = useLocation()

  const dispatch = useDispatch()

  useEffect(() => {
    setMenuIsOpen(false)
  }, [location])
  
  return (
    <div className='navbar'>
      <div className='left'>
        <Link to='/'><span>KAP Social</span></Link>
        <Link to={`/profile/${currentUser.id}`}><HomeOutlinedIcon /></Link>
        {darkMode ? <WbSunnyOutlinedIcon onClick={toggle} /> : <DarkModeOutlinedIcon onClick={toggle} />}
        <GridViewOutlinedIcon onClick={()=>dispatch(showModal(`Feature coming soon!`))} />
        <div className='search' onClick={()=>dispatch(showModal(`Feature coming soon!`))}>
          <SearchOutlinedIcon />
          <input type='text' placeholder='Search...' />
        </div>
      </div>
      <div className='right'>
        <PersonOutlinedIcon onClick={()=>dispatch(showModal(`Feature coming soon!`))} />
        <EmailOutlinedIcon onClick={()=>dispatch(showModal(`Feature coming soon!`))} />
        <NotificationsOutlinedIcon onClick={()=>dispatch(showModal(`Feature coming soon!`))} />
        <div className='user'>
          <Link to={`/profile/${currentUser.id}`}>
            <img src={currentUser.profilePic || avatar} alt='' />
            <span>{currentUser.name}</span>
          </Link>
          <ExpandMoreIcon onClick={()=>setMenuIsOpen(prev=>!prev)} />
          {menuIsOpen && <div className='menu'><button onClick={logout}>Logout</button></div>}
        </div>
      </div>
    </div>
  )
}

export default Navbar