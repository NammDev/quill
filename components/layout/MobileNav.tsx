'use client'

import { ArrowRight, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const MobileNav = ({ isAuth }: { isAuth: boolean }) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const toggleOpen = () => setOpen((prev) => !prev)

  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) toggleOpen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen()
    }
  }

  return (
    <div className='sm:hidden'>
      <Menu onClick={toggleOpen} className='relative z-50 w-5 h-5 text-zinc-700' />

      {isOpen ? (
        <div className='fixed inset-0 z-0 w-full animate-in slide-in-from-top-5 fade-in-20'>
          <ul className='absolute grid w-full gap-3 px-10 pt-20 pb-8 bg-white border-b shadow-xl border-zinc-200'>
            {!isAuth ? (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/sign-up')}
                    className='flex items-center w-full font-semibold text-green-600'
                    href='/sign-up'
                  >
                    Get started
                    <ArrowRight className='w-5 h-5 ml-2' />
                  </Link>
                </li>
                <li className='w-full h-px my-3 bg-gray-300' />
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/sign-in')}
                    className='flex items-center w-full font-semibold'
                    href='/sign-in'
                  >
                    Sign in
                  </Link>
                </li>
                <li className='w-full h-px my-3 bg-gray-300' />
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/pricing')}
                    className='flex items-center w-full font-semibold'
                    href='/pricing'
                  >
                    Pricing
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/dashboard')}
                    className='flex items-center w-full font-semibold'
                    href='/dashboard'
                  >
                    Dashboard
                  </Link>
                </li>
                <li className='w-full h-px my-3 bg-gray-300' />
                <li>
                  <Link className='flex items-center w-full font-semibold' href='/sign-out'>
                    Sign out
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav
