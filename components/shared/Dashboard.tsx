'use client'

import React from 'react'
import UploadButton from './UploadButton'
import { trpc } from '@/app/_trpc/client'
import { Ghost, Loader2, MessageSquare, Plus, Trash } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import { Button } from '../ui/button'
import { format } from 'date-fns'

const Dashboard = () => {
  const { data: files, isLoading } = trpc.getUserFiles.useQuery()

  const currentlyDeletingFile = 'true'

  const deleteFile = ({ id }: any) => {
    console.log(`delete file ${id}`)
  }

  return (
    <main className='mx-auto max-w-7xl md:p-10'>
      <div className='flex flex-col items-start justify-between gap-4 pb-5 mt-8 border-b border-gray-200 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 text-5xl font-bold text-gray-900'>My Files</h1>
        <UploadButton isSubscribed={true} />
      </div>

      {/* display all user files */}
      {files && files.length !== 0 ? (
        <ul className='grid grid-cols-1 gap-6 mt-8 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
          {files
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((file) => (
              <li
                key={file.id}
                className='col-span-1 transition bg-white divide-y divide-gray-200 rounded-lg shadow hover:shadow-lg'
              >
                <Link href={`/dashboard/${file.id}`} className='flex flex-col gap-2'>
                  <div className='flex items-center justify-between w-full px-6 pt-6 space-x-6'>
                    <div className='flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500' />
                    <div className='flex-1 truncate'>
                      <div className='flex items-center space-x-3'>
                        <h3 className='text-lg font-medium truncate text-zinc-900'>{file.name}</h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className='grid grid-cols-3 gap-6 px-6 py-2 mt-4 text-xs place-items-center text-zinc-500'>
                  <div className='flex items-center gap-2'>
                    <Plus className='w-4 h-4' />
                    {format(new Date(file.createdAt), 'MMM yyyy')}
                  </div>

                  <div className='flex items-center gap-2'>
                    <MessageSquare className='w-4 h-4' />
                    mocked
                  </div>

                  <Button
                    onClick={() => deleteFile({ id: file.id })}
                    size='sm'
                    className='w-full'
                    variant='destructive'
                  >
                    {currentlyDeletingFile === file.id ? (
                      <Loader2 className='w-4 h-4 animate-spin' />
                    ) : (
                      <Trash className='w-4 h-4' />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
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
