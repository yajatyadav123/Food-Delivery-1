import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = ({ setToken }) => {

  const logout = () => {
    localStorage.removeItem("adminToken"); // or "token" if you're using that key
    setToken("");
  };

  return (
    <div className='navbar'>
      <img className="logo" src={assets.logo} alt="Logo" />

      <div className="navbar-right">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

        <img className="profile" src={assets.profile_image} alt="Profile" />
      </div>
    </div>
  )
}

export default Navbar;