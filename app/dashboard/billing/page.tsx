import BillingForm from '@/components/shared/BillingForm'
import { getUserSubscriptionPlan } from '@/lib/stripe'

const Page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan()
  console.log(subscriptionPlan)
  return <BillingForm subscriptionPlan={subscriptionPlan} />
}

export default Page
