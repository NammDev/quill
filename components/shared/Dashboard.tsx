'use client'

import React from 'react'
import UploadButton from './UploadButton'
import { trpc } from '@/app/_trpc/client'
import { Ghost } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'

const Dashboard = () => {
  const { data: files, isLoading } = trpc.getUserFiles.useQuery()

  return (
    <main className='mx-auto max-w-7xl md:p-10'>
      <div className='flex flex-col items-start justify-between gap-4 pb-5 mt-8 border-b border-gray-200 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 text-5xl font-bold text-gray-900'>My Files</h1>
        <UploadButton isSubscribed={true} />
      </div>

      {/* display all user files */}
      {files && files.length !== 0 ? (
        <p>File</p>
      ) : isLoading ? (
        <Skeleton height={100} className='my-2' count={3} />
      ) : (
        <div className='flex flex-col items-center gap-2 mt-16'>
          <Ghost className='w-8 h-8 text-zinc-800' />
          <h3 className='text-xl font-semibold'>Pretty empty around here</h3>
          <p>Let&apos;s upload your first PDF.</p>
        </div>
      )}
    </main>
  )
}

export default Dashboard
