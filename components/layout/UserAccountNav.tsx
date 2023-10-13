import Image from 'next/image'
import Link from 'next/link'
import { Gem } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Icons } from '../shared/Icon'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server'
import { getUserSubscriptionPlan } from '@/lib/stripe'

interface UserAccountNavProps {
  email: string | undefined
  name: string
  imageUrl: string
}

const UserAccountNav = async ({ email, imageUrl, name }: UserAccountNavProps) => {
  const subscriptionPlan = await getUserSubscriptionPlan()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='overflow-visible'>
        <Button className='w-8 h-8 rounded-full aspect-square bg-slate-400'>
          <Avatar className='relative w-8 h-8'>
            {imageUrl ? (
              <div className='relative w-full h-full aspect-square'>
                <Image fill src={imageUrl} alt='profile picture' referrerPolicy='no-referrer' />
              </div>
            ) : (
              <AvatarFallback>
                <span className='sr-only'>{name}</span>
                <Icons.user className='w-4 h-4 text-zinc-900' />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='bg-white' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            {name && <p className='text-sm font-medium text-black'>{name}</p>}
            {email && <p className='w-[200px] truncate text-xs text-zinc-700'>{email}</p>}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href='/dashboard'>Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          {subscriptionPlan?.isSubscribed ? (
            <Link href='/dashboard/billing'>Manage Subscription</Link>
          ) : (
            <Link href='/pricing'>Upgrade</Link>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='cursor-pointer' asChild>
          <LogoutLink>Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
