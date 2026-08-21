import React from 'react'
import './Sidbar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidbar = () => {
  return (
    <div className='sidbar'>
        <div className='sidbar-options'>
            <NavLink to='/add' className='sidbar-option'>
                <img src={assets.add_icon} alt="" />
                <p>Add items</p>
            </NavLink>
            <NavLink to='/list' className='sidbar-option'>
                <img src={assets.order_icon} alt="" />
                <p>List items</p>
            </NavLink>
            <NavLink to = '/orders'  className='sidbar-option'>
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink >
        </div>
    </div>
  )
}

export default Sidbar