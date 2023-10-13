'use client'

import { trpc } from '@/app/_trpc/client'
import { ChevronLeft, Loader2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import Messages from './Messages'
import ChatInput from './ChatInput'
import { ChatContextProvider } from './ChatContext'
import { PLANS } from '@/config/stripe'

interface ChatWrapperProps {
  fileId: string
  isSubscribed: boolean
}

const ChatWrapper = ({ fileId, isSubscribed }: ChatWrapperProps) => {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    { fileId },
    {
      refetchInterval: (data) =>
        data?.status === 'SUCCESS' || data?.status === 'FAILED' ? false : 500,
    }
  )

  if (isLoading)
    return (
      <div className='relative flex flex-col justify-between min-h-full gap-2 divide-y bg-zinc-50 divide-zinc-200'>
        <div className='flex flex-col items-center justify-center flex-1 mb-28'>
          <div className='flex flex-col items-center gap-2'>
            <Loader2 className='w-8 h-8 text-blue-500 animate-spin' />
            <h3 className='text-xl font-semibold'>Loading...</h3>
            <p className='text-sm text-zinc-500'>We&apos;re preparing your PDF.</p>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    )

  if (data?.status === 'PROCESSING')
    return (
      <div className='relative flex flex-col justify-between min-h-full gap-2 divide-y bg-zinc-50 divide-zinc-200'>
        <div className='flex flex-col items-center justify-center flex-1 mb-28'>
          <div className='flex flex-col items-center gap-2'>
            <Loader2 className='w-8 h-8 text-blue-500 animate-spin' />
            <h3 className='text-xl font-semibold'>Processing PDF...</h3>
            <p className='text-sm text-zinc-500'>This won&apos;t take long.</p>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    )

  if (data?.status === 'FAILED')
    return (
      <div className='relative flex flex-col justify-between min-h-full gap-2 divide-y bg-zinc-50 divide-zinc-200'>
        <div className='flex flex-col items-center justify-center flex-1 mb-28'>
          <div className='flex flex-col items-center gap-2'>
            <XCircle className='w-8 h-8 text-red-500' />
            <h3 className='text-xl font-semibold'>Too many pages in PDF</h3>
            <p className='text-sm text-zinc-500'>
              Your <span className='font-medium'>{isSubscribed ? 'Pro' : 'Free'}</span> plan
              supports up to{' '}
              {isSubscribed
                ? PLANS.find((p) => p.name === 'Pro')?.pagesPerPdf
                : PLANS.find((p) => p.name === 'Free')?.pagesPerPdf}{' '}
              pages per PDF.
            </p>
            <Link
              href='/dashboard'
              className={buttonVariants({
                variant: 'secondary',
                className: 'mt-4',
              })}
            >
              <ChevronLeft className='h-3 w-3 mr-1.5' />
              Back
            </Link>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    )
  return (
    <ChatContextProvider fileId={fileId}>
      <div className='relative flex flex-col justify-between min-h-full gap-2 divide-y bg-zinc-50 divide-zinc-200'>
        <div className='flex flex-col justify-between flex-1 mb-28'>
          <Messages fileId={fileId} />
        </div>
        <ChatInput />
      </div>
    </ChatContextProvider>
  )
}

export default ChatWrapper
