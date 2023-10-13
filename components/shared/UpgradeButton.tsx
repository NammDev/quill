'use client'

import { ArrowRight } from 'lucide-react'
import { trpc } from '@/app/_trpc/client'
import { Button } from '../ui/button'

const UpgradeButton = () => {
  const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
    onSuccess: ({ url }) => {
      window.location.href = url ?? '/dashboard/billing'
    },
  })

  return (
    <Button onClick={() => createStripeSession()} className='w-full'>
      Upgrade now
    </Button>
  )
}

export default UpgradeButton
