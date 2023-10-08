'use client'

import { ChevronDown, ChevronUp, Loader2, RotateCw, Search } from 'lucide-react'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface PdfRendererProps {
  url: string
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  return (
    <div className='flex flex-col items-center w-full bg-white rounded-md shadow'>
      <div className='flex items-center justify-between w-full px-2 border-b h-14 border-zinc-200'>
        <div className='flex items-center gap-1.5'>
          <Button variant='ghost' aria-label='previous page'>
            <ChevronDown className='w-4 h-4' />
          </Button>

          <div className='flex items-center gap-1.5'>
            <Input className={cn('w-12 h-8')} />
            <p className='space-x-1 text-sm text-zinc-700'>
              <span>/</span>
              <span>{'x'}</span>
            </p>
          </div>

          <Button variant='ghost' aria-label='next page'>
            <ChevronUp className='w-4 h-4' />
          </Button>
        </div>

        <div className='space-x-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='gap-1.5' aria-label='zoom' variant='ghost'>
                <Search className='w-4 h-4' />
                {100}%
                <ChevronDown className='w-3 h-3 opacity-50' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>100%</DropdownMenuItem>
              <DropdownMenuItem>150%</DropdownMenuItem>
              <DropdownMenuItem>200%</DropdownMenuItem>
              <DropdownMenuItem>250%</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant='ghost' aria-label='rotate 90 degrees'>
            <RotateCw className='w-4 h-4' />
          </Button>

          {/* <PdfFullscreen fileUrl={url} /> */}
        </div>
      </div>

      <div className='flex-1 w-full max-h-screen'></div>
    </div>
  )
}

export default PdfRenderer
