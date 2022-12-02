import React from 'react'
import Contacts from '../Home/Contacts'

const ComunitySidebar = () => {
  return (
    <div className='hidden lg:inline-flex lg:min-w-[280px] md:inline-flex flex-col bg-[#00a5b5] md:min-w-[250px] mt-1 h-screen top-16 sticky'>
        <div className='mx-auto py-1 my-2 border-b-2 border-cyan-900'>
            <p className='font-semibold text-cyan-900'>Contacts</p>
        </div>
        <Contacts />
    </div>
  )
}

export default ComunitySidebar