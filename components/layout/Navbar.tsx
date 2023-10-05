import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '../ui/button'
import MobileNav from './MobileNav'
import UserAccountNav from './UserAccountNav'
import { LoginLink, RegisterLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

const Navbar = () => {
  const { getUser } = getKindeServerSession()
  const user = getUser()

  return (
    <nav className='sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 h-14 bg-white/75 backdrop-blur-lg'>
      <MaxWidthWrapper>
        <div className='flex items-center justify-between border-b h-14 border-zinc-200'>
          <Link href='/' className='z-40 flex font-semibold'>
            <span>quill.</span>
          </Link>
          <MobileNav isAuth={!!user} />
          <div className='items-center hidden space-x-4 sm:flex'>
            {!user ? (
              <>
                <Link
                  href='/pricing'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Pricing
                </Link>
                <LoginLink
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Sign in
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    size: 'sm',
                  })}
                >
                  Get started <ArrowRight className='ml-1.5 h-5 w-5' />
                </RegisterLink>
              </>
            ) : (
              <>
                <Link
                  href='/dashboard'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Dashboard
                </Link>

                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? 'Your Account'
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ''}
                  imageUrl={user.picture ?? ''}
                />
              </>
            )}
          </div>{' '}
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
