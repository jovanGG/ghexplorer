import React from 'react'

import { FaAngular, FaReact, FaVuejs } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import './style.css'

const Nav = () => {  

  return (
    <nav className='nav'>
      <div className="logo">
      <Link to='/'><img src="/GitHub-Logo.png" alt='Github Logo' className='logo' /></Link>
      </div>
      <div className="nav-wrapper">
        <NavLink className='nav-link' to='/react'> <FaReact className='nav-icon' /> React</NavLink>
        <NavLink className='nav-link' to='/vue'> <FaVuejs className='nav-icon' /> Vue </NavLink>
        <NavLink className='nav-link' to='/angular'> <FaAngular className='nav-icon' /> Angular </NavLink>
      </div>      
    </nav>
  )
}

export default Nav
