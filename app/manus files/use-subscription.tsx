'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { PLANS } from '@/lib/stripe'
import { getStripe } from '@/lib/stripe'

export default function SubscriptionManager() {
  const [currentPlan, setCurrentPlan] = useState('BASIC')
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const handlePlanChange = (planId: string) => {
    setCurrentPlan(planId)
  }

  const handleBillingCycleChange = (cycle: string) => {
    setBillingCycle(cycle)
  }

  const handleCheckout = async () => {
    if (!user) {
      return
    }

    setIsLoading(true)

    try {
      // Create checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: currentPlan,
          billingCycle,
        }),
      })

      const { sessionId } = await response.json()

      // Redirect to Stripe checkout
      const stripe = await getStripe()
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          throw new Error(error.message)
        }
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (!user) {
      return
    }

    setIsLoading(true)

    try {
      // Call API to cancel subscription
      const response = await fetch('/api/stripe/cancel', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to cancel subscription')
      }

      // Refresh page to show updated subscription status
      window.location.reload()
    } catch (error) {
      console.error('Error canceling subscription:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    currentPlan,
    billingCycle,
    isLoading,
    plans: PLANS,
    handlePlanChange,
    handleBillingCycleChange,
    handleCheckout,
    handleCancelSubscription,
  }
}
