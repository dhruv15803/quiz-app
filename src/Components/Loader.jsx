import React from 'react'

const Loader = () => {
  return (
    <>
    <div className='flex gap-1 items-center'>
    <div className='border-2 w-8 h-8 border-blue-500 rounded-lg animate-spin'>
    </div>
    <p className='text-blue-500'>Loading ...</p>
    </div>
    </>
  )
}

export default Loader