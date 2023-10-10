'use client'

import { trpc } from '@/app/_trpc/client'
import { ChevronLeft, Loader2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import Messages from './Messages'
import ChatInput from './ChatInput'

interface ChatWrapperProps {
  fileId: string
  isSubscribed: boolean
}

const ChatWrapper = ({ fileId, isSubscribed }: ChatWrapperProps) => {
  return (
    <div className='relative flex flex-col justify-between min-h-full gap-2 divide-y bg-zinc-50 divide-zinc-200'>
      <div className='flex flex-col justify-between flex-1 mb-28'>
        <Messages fileId={fileId} />
      </div>

      <ChatInput />
    </div>
  )
}

export default ChatWrapper
