import React from 'react'
import {FaUserFriends} from 'react-icons/fa'
import {FcMindMap} from 'react-icons/fc'
import {AiFillSchedule} from 'react-icons/ai'


const Sidebar = () => {
  return (
    <div className='hidden lg:inline-flex flex-col py-2 px-2 max-w-xl lg:min-w-[250px] bg-[#00d2e3] mt-1 h-screen top-16 sticky'>
        <div className='flex items-center py-3 px-4 border-2 border-white mt-1 rounded-md cursor-pointer hover:bg-blue-50'>
            <FaUserFriends size={30}/>
            <p className='pl-2'>Friends</p>
        </div>
        <div className='flex items-center py-3 px-4 border-2 border-white mt-1 rounded-md cursor-pointer hover:bg-blue-50'>
            <FcMindMap size={30}/>
            <p className='pl-2'>Professionals </p>
        </div>
        <div className='flex items-center py-3 px-4 border-2 border-white mt-1 rounded-md cursor-pointer hover:bg-blue-50'>
            <AiFillSchedule size={30}/>
            <p className='pl-2'>Reminder </p>
        </div>
    </div>
  )
}

export default Sidebar