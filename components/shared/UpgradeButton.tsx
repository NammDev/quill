'use client'

import { ArrowRight, Loader2 } from 'lucide-react'
import { trpc } from '@/app/_trpc/client'
import { Button } from '../ui/button'

const UpgradeButton = () => {
  const { mutate: createStripeSession, isLoading } = trpc.createStripeSession.useMutation({
    onSuccess: ({ url }) => {
      window.location.href = url ?? '/dashboard/billing'
    },
  })

  return (
    <Button onClick={() => createStripeSession()} className='w-full'>
      {isLoading ? <Loader2 className='w-4 h-4 mr-4 animate-spin' /> : null}
      Upgrade now
    </Button>
  )
}

export default UpgradeButton
