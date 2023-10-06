'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

const UploadDropzone = ({ isSubscribed }: { isSubscribed: boolean }) => {
  return <p>Drop zone</p>
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
