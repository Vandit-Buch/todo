import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-950 flex justify-between  text-blue-200 px-6'>
        <div className="my-7">
            <span className='font-bold text-5xl mx-9'>
                Vandit's To Do
            </span>
        </div>
        
        <a href='https://github.com/Vandit-Buch/todo.git' className='my-9 cursor-pointer decoration-0 flex gap-10 text-3xl hover:font-bold transition-all'>Go To Codebase</a>
    </nav>
  )
}

export default Navbar
