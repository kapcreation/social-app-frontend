import React, { useContext, useState } from 'react'
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
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext)
  const { currentUser, logout } = useContext(AuthContext)
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <div className='navbar'>
      <div className='left'>
        <Link to='/'><span>KAP Social</span></Link>
        <Link to={`/profile/${currentUser.id}`}><HomeOutlinedIcon /></Link>
        {darkMode ? <WbSunnyOutlinedIcon onClick={toggle} /> : <DarkModeOutlinedIcon onClick={toggle} />}
        <GridViewOutlinedIcon />
        <div className='search'>
          <SearchOutlinedIcon />
          <input type='text' placeholder='Search...' />
        </div>
      </div>
      <div className='right'>
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className='user'>
          <img src={currentUser.profilePic || avatar} alt='' />
          <span>{currentUser.name}</span>
          <ExpandMoreIcon onClick={()=>setMenuIsOpen(prev=>!prev)} />
          {menuIsOpen && <div className='menu'><button onClick={logout}>Logout</button></div>}
        </div>
      </div>
    </div>
  )
}

export default Navbar