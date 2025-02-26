import React from 'react'

function Header() {
  return (
    <div className='max-w-6xl flex justify-between py-3 w-full'>
      <div className='flex gap-10'>
        <div className='w-fit flex flex-col items-center'><span className='text-[#1A73E8] font-bold text-xl'>accredian</span><span className='text-[8px]'>credentials that matter</span></div>
        <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1A73E8]'><div>Courses</div><div className='rotate-90 text-lg'>{">"}</div></div>
      </div>
      <div>
        <ul className='flex items-center gap-10'>
            <li className='hover:bg-[#1A73E8] px-3 py-2 rounded-lg cursor-pointer'>Refer & Earn</li>
            <li className='hover:bg-[#1A73E8] px-3 py-2 rounded-lg cursor-pointer'>Resourses</li>
            <li className='hover:bg-[#1A73E8] px-3 py-2 rounded-lg cursor-pointer'>About Us</li>
            <li className=''><button className='bg-[#94A3B833] px-3 py-2 rounded-lg'>Login</button></li>
            <li className=''><button className='px-3 py-2 rounded-lg bg-[#1A73E8]'>Try For free</button></li>
        </ul>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Header
