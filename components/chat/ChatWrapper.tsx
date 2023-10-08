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
  return <div>Chat Wrapper</div>
}

export default ChatWrapper
