import { trpc } from '@/app/_trpc/client'
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query'
import { Loader2, MessageSquare } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import Message from './Message'
import { useContext, useEffect, useRef } from 'react'
import { useIntersection } from '@mantine/hooks'
import { ChatContext } from './ChatContext'

interface MessagesProps {
  fileId: string
}

const Messages = ({ fileId }: MessagesProps) => {
  const { isLoading: isAiThinking } = useContext(ChatContext)

  const { data, isLoading, fetchNextPage } = trpc.getFileMessages.useInfiniteQuery(
    {
      fileId,
      limit: INFINITE_QUERY_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      keepPreviousData: true,
    }
  )

  const messages = data?.pages.flatMap((page) => page.messages)

  const loadingMessage = {
    createdAt: new Date().toISOString(),
    id: 'loading-message',
    isUserMessage: false,
    text: (
      <span className='flex items-center justify-center h-full'>
        <Loader2 className='w-4 h-4 animate-spin' />
      </span>
    ),
  }

  const combinedMessages = [...(isAiThinking ? [loadingMessage] : []), ...(messages ?? [])]

  const lastMessageRef = useRef<HTMLDivElement>(null)

  const { ref, entry } = useIntersection({
    root: lastMessageRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  return (
    <div className='flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
      {combinedMessages && combinedMessages.length > 0 ? (
        combinedMessages.map((message, i) => {
          const isNextMessageSamePerson =
            combinedMessages[i - 1]?.isUserMessage === combinedMessages[i]?.isUserMessage

          if (i === combinedMessages.length - 1) {
            return (
              <Message
                ref={ref}
                message={message}
                isNextMessageSamePerson={isNextMessageSamePerson}
                key={message.id}
              />
            )
          } else
            return (
              <Message
                message={message}
                isNextMessageSamePerson={isNextMessageSamePerson}
                key={message.id}
              />
            )
        })
      ) : isLoading ? (
        <div className='flex flex-col w-full gap-2'>
          <Skeleton className='h-16' />
          <Skeleton className='h-16' />
          <Skeleton className='h-16' />
          <Skeleton className='h-16' />
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center flex-1 gap-2'>
          <MessageSquare className='w-8 h-8 text-blue-500' />
          <h3 className='text-xl font-semibold'>You&apos;re all set!</h3>
          <p className='text-sm text-zinc-500'>Ask your first question to get started.</p>
        </div>
      )}
    </div>
  )
}

export default Messages
