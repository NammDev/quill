'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import Dropzone from 'react-dropzone'
import { Cloud, File, Loader2 } from 'lucide-react'
import { Progress } from '../ui/progress'

const UploadDropzone = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const [isUploading, setIsUploading] = useState<boolean | null>(true)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const startSimulatedProgress = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval)
          return prevProgress
        }
        return prevProgress + 5
      })
    }, 500)
    return interval
  }

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true)
        const progressInterval = startSimulatedProgress()
        // handle file uploading

        clearInterval(progressInterval)
        setUploadProgress(100)
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className='h-64 m-4 border border-gray-300 border-dashed rounded-lg'
        >
          <div className='flex items-center justify-center w-full h-full'>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
            >
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <Cloud className='w-6 h-6 mb-2 text-zinc-500' />
                <p className='mb-2 text-sm text-zinc-700'>
                  <span className='font-semibold'>Click to upload</span> or drag and drop
                </p>
                <p className='text-xs text-zinc-500'>PDF (up to {isSubscribed ? '16' : '4'}MB)</p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className='max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200'>
                  <div className='grid h-full px-3 py-2 place-items-center'>
                    <File className='w-4 h-4 text-blue-500' />
                  </div>
                  <div className='h-full px-3 py-2 text-sm truncate'>{acceptedFiles[0].name}</div>
                </div>
              ) : null}

              {isUploading ? (
                <div className='w-full max-w-xs mx-auto mt-4'>
                  <Progress
                    indicatorColor={uploadProgress === 100 ? 'bg-green-500' : ''}
                    value={uploadProgress}
                    className='w-full h-1 bg-zinc-200'
                  />
                  {uploadProgress === 100 ? (
                    <div className='flex items-center justify-center gap-1 pt-2 text-sm text-center text-zinc-700'>
                      <Loader2 className='w-3 h-3 animate-spin' />
                      Redirecting...
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* <input {...getInputProps()} type='file' id='dropzone-file' className='hidden' /> */}
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  )
}

const UploadButton = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) setIsOpen(v)
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>

      <DialogContent>
        <UploadDropzone isSubscribed={isSubscribed} />
      </DialogContent>
    </Dialog>
  )
}

export default UploadButton
