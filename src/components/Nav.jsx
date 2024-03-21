import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='navv'>
        <img src="../public/Logo.svg" alt="" />
        <ul>
            <Link to='/'>
                <li><img src="../public/first.svg" alt="" /></li>
            </Link>
            <Link to='/products'>
                <li><img src="../public/add.svg" alt="" /></li>
            </Link>
        </ul>
    </div>
  )
}

export default Nav  