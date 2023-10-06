'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { trpc } from '../_trpc/client'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  // trpc
  const { data, isLoading } = trpc.authCallback.useQuery(undefined, {
    onSuccess({ success }) {
      if (success) {
        // user is sync to db
        router.push(origin ? `/${origin}` : '/dashboard')
      }
    },
  })
  return <div>page</div>
}

export default Page
