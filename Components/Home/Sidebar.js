import React, { useState } from 'react'
import {MdOutlineQuiz} from 'react-icons/md'
import {FcMindMap} from 'react-icons/fc'
import {AiFillSchedule} from 'react-icons/ai'
import Link from 'next/link'


const Sidebar = () => {  
  return (
    <div className='hidden lg:inline-flex flex-col py-2 px-2 max-w-xl lg:min-w-[250px] bg-[#00d2e3] mt-1 h-screen top-16 sticky'>
        <div className='flex items-center py-3 px-4 border-2 border-white mt-1 rounded-md cursor-pointer hover:bg-blue-50'>
            <MdOutlineQuiz size={30}/>
            <Link className='pl-2' href="/models">Models</Link>
        </div>
        <div className='flex items-center py-3 px-4 border-2 border-white mt-1 rounded-md cursor-pointer hover:bg-blue-50'>
            <FcMindMap size={30}/>
            <Link className='pl-2' href="/professionals">Professionals</Link>
        </div>
        <div className='flex items-center py-3 px-4 border-2 border-white mt-1 rounded-md cursor-pointer hover:bg-blue-50'>
            <AiFillSchedule size={30}/>
            <p className='pl-2'>Reminder </p>
        </div>
    </div>
  )
}

export default Sidebar