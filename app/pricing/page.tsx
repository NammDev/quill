import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper'
import UpgradeButton from '@/components/shared/UpgradeButton'
import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { PLANS } from '@/config/stripe'
import { cn } from '@/lib/utils'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight, Check, HelpCircle, Minus } from 'lucide-react'
import Link from 'next/link'

const Page = () => {
  const { getUser } = getKindeServerSession()
  const user = getUser()
  const pricingItems = [
    {
      plan: 'Free',
      tagline: 'For small side projects.',
      quota: 10,
      features: [
        {
          text: '5 pages per PDF',
          footnote: 'The maximum amount of pages per PDF-file.',
        },
        {
          text: '4MB file size limit',
          footnote: 'The maximum file size of a single PDF file.',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'Higher-quality responses',
          footnote: 'Better algorithmic responses for enhanced content quality',
          negative: true,
        },
        {
          text: 'Priority support',
          negative: true,
        },
      ],
    },
    {
      plan: 'Pro',
      tagline: 'For larger projects with higher needs.',
      quota: PLANS.find((p) => p.slug === 'pro')!.quota,
      features: [
        {
          text: '25 pages per PDF',
          footnote: 'The maximum amount of pages per PDF-file.',
        },
        {
          text: '16MB file size limit',
          footnote: 'The maximum file size of a single PDF file.',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'Higher-quality responses',
          footnote: 'Better algorithmic responses for enhanced content quality',
        },
        {
          text: 'Priority support',
        },
      ],
    },
  ]
  return (
    <>
      <MaxWidthWrapper className='max-w-5xl mt-24 mb-8 text-center'>
        <div className='mx-auto mb-10 sm:max-w-lg'>
          <h1 className='text-6xl font-bold sm:text-7xl'>Pricing</h1>
          <p className='mt-5 text-gray-600 sm:text-lg'>
            Whether you&apos;re just trying out our service or need more, we&apos;ve got you
            covered.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-10 pt-12 lg:grid-cols-2'>
          <TooltipProvider>
            {pricingItems.map(({ plan, tagline, quota, features }) => {
              const price = PLANS.find((p) => p.slug === plan.toLowerCase())?.price.amount || 0
              return (
                <div
                  key={plan}
                  className={cn('relative rounded-2xl bg-white shadow-lg', {
                    'border-2 border-blue-600 shadow-blue-200': plan === 'Pro',
                    'border border-gray-200': plan !== 'Pro',
                  })}
                >
                  {plan === 'Pro' && (
                    <div className='absolute left-0 right-0 w-32 px-3 py-2 mx-auto text-sm font-medium text-white rounded-full -top-5 bg-gradient-to-r from-blue-600 to-cyan-600'>
                      Upgrade now
                    </div>
                  )}

                  <div className='p-5'>
                    <h3 className='my-3 text-3xl font-bold text-center font-display'>{plan}</h3>
                    <p className='text-gray-500'>{tagline}</p>
                    <p className='my-5 text-6xl font-semibold font-display'>${price}</p>
                    <p className='text-gray-500'>per month</p>
                  </div>

                  <div className='flex items-center justify-center h-20 border-t border-b border-gray-200 bg-gray-50'>
                    <div className='flex items-center space-x-1'>
                      <p>{quota.toLocaleString()} PDFs/mo included</p>

                      <Tooltip delayDuration={300}>
                        <TooltipTrigger className='cursor-default ml-1.5'>
                          <HelpCircle className='w-4 h-4 text-zinc-500' />
                        </TooltipTrigger>
                        <TooltipContent className='p-2 w-80'>
                          How many PDFs you can upload per month.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <ul className='px-8 my-10 space-y-5'>
                    {features.map(({ text, footnote, negative }) => (
                      <li key={text} className='flex space-x-5'>
                        <div className='flex-shrink-0'>
                          {negative ? (
                            <Minus className='w-6 h-6 text-gray-300' />
                          ) : (
                            <Check className='w-6 h-6 text-blue-500' />
                          )}
                        </div>
                        {footnote ? (
                          <div className='flex items-center space-x-1'>
                            <p
                              className={cn('text-gray-600', {
                                'text-gray-400': negative,
                              })}
                            >
                              {text}
                            </p>
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger className='cursor-default ml-1.5'>
                                <HelpCircle className='w-4 h-4 text-zinc-500' />
                              </TooltipTrigger>
                              <TooltipContent className='p-2 w-80'>{footnote}</TooltipContent>
                            </Tooltip>
                          </div>
                        ) : (
                          <p
                            className={cn('text-gray-600', {
                              'text-gray-400': negative,
                            })}
                          >
                            {text}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className='border-t border-gray-200' />
                  <div className='p-5'>
                    {plan === 'Free' ? (
                      <Link
                        href={user ? '/dashboard' : '/sign-in'}
                        className={buttonVariants({
                          className: 'w-full',
                          variant: 'secondary',
                        })}
                      >
                        {user ? 'Dashboard' : 'Sign up'}
                        <ArrowRight className='h-5 w-5 ml-1.5' />
                      </Link>
                    ) : user ? (
                      <UpgradeButton />
                    ) : (
                      <Link
                        href='/sign-in'
                        className={buttonVariants({
                          className: 'w-full',
                        })}
                      >
                        {user ? 'Upgrade now' : 'Sign up'}
                        <ArrowRight className='h-5 w-5 ml-1.5' />
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  )
}

export default Page
