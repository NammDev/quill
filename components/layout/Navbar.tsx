import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '../ui/button'
import MobileNav from './MobileNav'

const Navbar = () => {
  const user = false

  return (
    <nav className='sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 h-14 bg-white/75 backdrop-blur-lg'>
      <MaxWidthWrapper>
        <div className='flex items-center justify-between border-b h-14 border-zinc-200'>
          <Link href='/' className='z-40 flex font-semibold'>
            <span>quill.</span>
          </Link>

          <MobileNav isAuth={!!user} />

          <div className='items-center hidden space-x-4 sm:flex'></div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
