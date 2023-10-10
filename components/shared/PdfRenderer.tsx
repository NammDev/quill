'use client'

import { ChevronDown, ChevronUp, Loader2, RotateCw, Search } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useToast } from '../ui/use-toast'
import { useResizeDetector } from 'react-resize-detector'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import SimpleBar from 'simplebar-react'
import PdfFullscreen from './PdfFullscreen'

interface PdfRendererProps {
  url: string
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  const { toast } = useToast()
  const { width, ref } = useResizeDetector()
  const [scale, setScale] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [numPages, setNumPages] = useState<number>()
  const [currPage, setCurrPage] = useState<number>(1)
  const [renderedScale, setRenderedScale] = useState<number | null>(null)

  const isLoading = renderedScale !== scale

  const CustomPageValidator = z.object({
    page: z.string().refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  })
  type TCustomePageValidator = z.infer<typeof CustomPageValidator>

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomePageValidator>({
    defaultValues: { page: '1' },
    resolver: zodResolver(CustomPageValidator),
  })

  const handlePageSubmit = ({ page }: TCustomePageValidator) => {
    setCurrPage(Number(page))
    setValue('page', String(page))
  }

  return (
    <div className='flex flex-col items-center w-full bg-white rounded-md shadow'>
      <div className='flex items-center justify-between w-full px-2 border-b h-14 border-zinc-200'>
        <div className='flex items-center gap-1.5'>
          <Button
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1))
              setValue('page', String(currPage - 1))
            }}
            variant='ghost'
            aria-label='previous page'
          >
            <ChevronUp className='w-4 h-4' />
          </Button>

          <div className='flex items-center gap-1.5'>
            <Input
              {...register('page')}
              className={cn('w-12 h-8', errors.page && 'focus-visible:ring-red-500')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(handlePageSubmit)()
                }
              }}
            />
            <p className='space-x-1 text-sm text-zinc-700'>
              <span>/</span>
              <span>{numPages ?? 'x'}</span>
            </p>
          </div>

          <Button
            variant='ghost'
            aria-label='next page'
            disabled={numPages === undefined || currPage === numPages}
            onClick={() => {
              setCurrPage((prev) => (prev + 1 > numPages! ? numPages! : prev + 1))
              setValue('page', String(currPage + 1))
            }}
          >
            <ChevronDown className='w-4 h-4' />
          </Button>
        </div>

        <div className='space-x-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='gap-1.5' aria-label='zoom' variant='ghost'>
                <Search className='w-4 h-4' />
                {scale * 100}%
                <ChevronDown className='w-3 h-3 opacity-50' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setScale(1)}>100%</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.5)}>150%</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2)}>200%</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2.5)}>250%</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => setRotation((prev) => prev + 90)}
            variant='ghost'
            aria-label='rotate 90 degrees'
          >
            <RotateCw className='w-4 h-4' />
          </Button>

          <PdfFullscreen fileUrl={url} />
        </div>
      </div>

      <div className='flex-1 w-full max-h-screen'>
        <SimpleBar autoHide={false} className='max-h-[calc(100vh-10rem)]'>
          <div ref={ref}>
            <Document
              file={url}
              className='max-h-full'
              loading={
                <div className='flex justify-center'>
                  <Loader2 className='w-6 h-6 my-24 animate-spin' />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: 'Error loading PDF',
                  description: 'Please try again later',
                  variant: 'destructive',
                })
              }}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
              {isLoading && renderedScale ? (
                <Page
                  width={width ? width : 1}
                  pageNumber={currPage}
                  scale={scale}
                  rotate={rotation}
                  key={'@' + renderedScale}
                />
              ) : null}

              {new Array(numPages).fill(0).map((_, i) => (
                <Page
                  className={cn(isLoading ? 'hidden' : '')}
                  width={width ? width : 1}
                  pageNumber={i + currPage}
                  scale={scale}
                  rotate={rotation}
                  key={i + '@' + scale}
                  loading={
                    <div className='flex justify-center'>
                      <Loader2 className='w-6 h-6 my-24 animate-spin' />
                    </div>
                  }
                  onRenderSuccess={() => setRenderedScale(scale)}
                />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

export default PdfRenderer
