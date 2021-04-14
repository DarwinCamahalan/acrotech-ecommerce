import React from 'react'
import PaymentDetails from './../../components/PaymentDetails'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { publishableKey } from './../../stripe/config'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
const stripePromise = loadStripe(publishableKey)

const Payment = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <Helmet>
        <title>Payment | Acrotech</title>
        <meta property="og:title" content="Payment" />
        <meta property="og:image" content="%PUBLIC_URL%/seo-main-image.png" />
      </Helmet>
      <Elements stripe={stripePromise}>
        <PaymentDetails />
      </Elements>
    </motion.div>
  )
}

export default Payment
