'use client'

import { trpc } from '@/app/_trpc/client'
import { ChevronLeft, Loader2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'

interface ChatWrapperProps {
  fileId: string
  isSubscribed: boolean
}

const ChatWrapper = ({ fileId, isSubscribed }: ChatWrapperProps) => {
  return (
    <div className='relative flex flex-col justify-between min-h-full gap-2 divide-y bg-zinc-50 divide-zinc-200'>
      <div className='flex flex-col items-center justify-center flex-1 mb-28'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='w-8 h-8 text-blue-500 animate-spin' />
          <h3 className='text-xl font-semibold'>Loading...</h3>
          <p className='text-sm text-zinc-500'>We&apos;re preparing your PDF.</p>
        </div>
      </div>

      {/* <ChatInput isDisabled /> */}
    </div>
  )
}

export default ChatWrapper
