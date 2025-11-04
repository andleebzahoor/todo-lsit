import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return ( 
    <>
    <nav className='w-full  h-auto py-2 px-15 flex gap-5 items-center justify-between text-white bg-pink-900'>
        <div>i Task</div>
        <ul className='flex gap-10 items-center cursor-pointer'>
            <Link to='/'><li >Home</li></Link>
            <li>your task</li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar