import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className='flex flex-col items-center justify-center mb-12 text-center mt-28 sm:mt-40'>
        <div className='flex items-center justify-center py-2 mx-auto mb-4 space-x-2 overflow-hidden transition-all bg-white border border-gray-200 rounded-full shadow-md max-w-fit px-7 backdrop-blur hover:border-gray-300 hover:bg-white/50'>
          <p className='text-sm font-semibold text-gray-700'>Quill is now public!</p>
        </div>
        <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
          Chat with your <span className='text-blue-600'>documents</span> in seconds.
        </h1>
        <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
          Quill allows you to have conversations with any PDF document. Simply upload your file and
          start asking questions right away.
        </p>

        <Link
          className={buttonVariants({
            size: 'lg',
            className: 'mt-5',
          })}
          href='/dashboard'
          target='_blank'
        >
          Get started <ArrowRight className='w-5 h-5 ml-2' />
        </Link>
      </MaxWidthWrapper>

      {/* value proposition section */}
      <div>
        <div className='relative isolate'>
          <div
            aria-hidden='true'
            className='absolute inset-x-0 overflow-hidden pointer-events-none -top-40 -z-10 transform-gpu blur-3xl sm:-top-80'
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>

          <div>
            <div className='max-w-6xl px-6 mx-auto lg:px-8'>
              <div className='flow-root mt-16 sm:mt-24'>
                <div className='p-2 -m-2 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <Image
                    src='/dashboard-preview.jpg'
                    alt='product preview'
                    width={1364}
                    height={866}
                    priority
                    quality={100}
                    className='p-2 bg-white rounded-md shadow-2xl sm:p-8 md:p-20 ring-1 ring-gray-900/10'
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden='true'
            className='absolute inset-x-0 overflow-hidden pointer-events-none -top-40 -z-10 transform-gpu blur-3xl sm:-top-80'
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
            />
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className='max-w-5xl mx-auto mt-32 mb-32 sm:mt-56'>
        <div className='px-6 mb-12 lg:px-8'>
          <div className='max-w-2xl mx-auto sm:text-center'>
            <h2 className='mt-2 text-4xl font-bold text-gray-900 sm:text-5xl'>
              Start chatting in minutes
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              Chatting to your PDF files has never been easier than with Quill.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className='pt-8 my-8 space-y-4 md:flex md:space-x-12 md:space-y-0'>
          <li className='md:flex-1'>
            <div className='flex flex-col py-2 pl-4 space-y-2 border-l-4 border-zinc-300 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>Step 1</span>
              <span className='text-xl font-semibold'>Sign up for an account</span>
              <span className='mt-2 text-zinc-700'>
                Either starting out with a free plan or choose our{' '}
                <Link href='/pricing' className='text-blue-700 underline underline-offset-2'>
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col py-2 pl-4 space-y-2 border-l-4 border-zinc-300 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>Step 2</span>
              <span className='text-xl font-semibold'>Upload your PDF file</span>
              <span className='mt-2 text-zinc-700'>
                We&apos;ll process your file and make it ready for you to chat with.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col py-2 pl-4 space-y-2 border-l-4 border-zinc-300 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>Step 3</span>
              <span className='text-xl font-semibold'>Start asking questions</span>
              <span className='mt-2 text-zinc-700'>
                It&apos;s that simple. Try out Quill today - it really takes less than a minute.
              </span>
            </div>
          </li>
        </ol>

        <div className='max-w-6xl px-6 mx-auto lg:px-8'>
          <div className='flow-root mt-16 sm:mt-24'>
            <div className='p-2 -m-2 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
              <Image
                src='/file-upload-preview.jpg'
                alt='uploading preview'
                width={1419}
                height={732}
                quality={100}
                className='p-2 bg-white rounded-md shadow-2xl sm:p-8 md:p-20 ring-1 ring-gray-900/10'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
