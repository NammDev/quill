import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { publicProcedure, router } from './trpc'
export const appRouter = router({})
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
