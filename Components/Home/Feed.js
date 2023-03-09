import React, { useEffect } from 'react'
import CreatePost from '../Home/CreatePost'
import Posts from '../Home/Posts'

const Feed = () => {
  return (
    <div className='flex-grow m-1 bg-[#c2fff6] border-solid overflow-visible'>
        <div className='mx-auto max-w-md md:max-w-xl lg:max-w-2xl'>
            {/* {create Post Box} */}
            <CreatePost/>
            {/* {Post stuff} */}
            <Posts/>
        </div>
    </div>
  )
}

export default Feed