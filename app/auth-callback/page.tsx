'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const route = useRouter()
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  // trpc
  return <div>page</div>
}

export default Page
