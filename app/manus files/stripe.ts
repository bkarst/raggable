// src/lib/stripe.ts
import { loadStripe } from '@stripe/stripe-js'
import Stripe from 'stripe'

// Load Stripe on the client side
export const getStripe = async () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
  const stripePromise = loadStripe(publishableKey)
  return stripePromise
}

// Initialize Stripe on the server side
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16', // Use the latest API version
})

// Subscription plan IDs
export const PLANS = {
  BASIC: {
    name: 'Basic Plan',
    description: 'Perfect for individuals with one email account',
    monthly: {
      priceId: 'price_basic_monthly',
      amount: 999, // $9.99
    },
    yearly: {
      priceId: 'price_basic_yearly',
      amount: 9900, // $99.00
    },
    features: [
      'AI-assisted email responses',
      'Email improvement feature',
      'One mailbox connection',
      'Standard support',
    ],
    mailboxLimit: 1,
  },
  PRO: {
    name: 'Pro Plan',
    description: 'For professionals with multiple email accounts',
    monthly: {
      priceId: 'price_pro_monthly',
      amount: 1999, // $19.99
    },
    yearly: {
      priceId: 'price_pro_yearly',
      amount: 19900, // $199.00
    },
    features: [
      'Everything in Basic',
      'Up to 3 mailbox connections',
      'Priority support',
      'Advanced analytics',
    ],
    mailboxLimit: 3,
  },
  TEAM: {
    name: 'Team Plan',
    description: 'For teams and small businesses',
    monthly: {
      priceId: 'price_team_monthly',
      amount: 4999, // $49.99
    },
    yearly: {
      priceId: 'price_team_yearly',
      amount: 49900, // $499.00
    },
    features: [
      'Everything in Pro',
      'Up to 10 mailbox connections',
      'Team management dashboard',
      'Dedicated support',
    ],
    mailboxLimit: 10,
  },
  ADDITIONAL_MAILBOX: {
    name: 'Additional Mailbox',
    monthly: {
      priceId: 'price_additional_mailbox',
      amount: 999, // $9.99
    },
  },
}
