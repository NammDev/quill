import React from 'react'
import UploadButton from './UploadButton'

const Dashboard = () => {
  return (
    <main className='mx-auto max-w-7xl md:p-10'>
      <div className='flex flex-col items-start justify-between gap-4 pb-5 mt-8 border-b border-gray-200 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 text-5xl font-bold text-gray-900'>My Files</h1>
        <UploadButton isSubscribed={true} />
      </div>

      {/* display all user files */}
    </main>
  )
}

export default Dashboard
