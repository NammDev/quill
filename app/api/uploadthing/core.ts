import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  pdfUploader: f({ image: { maxFileSize: '4MB' } })
    // before requeset
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession()
      const user = getUser()
      if (!user || !user.id) throw new Error('Unauthorized')

      return { userId: user.id }
    })
    // after done
    .onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
