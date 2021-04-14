import React from 'react'
import Checkout from './../../components/Checkout'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
const Cart = ({}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <Helmet>
        <title>Cart | Acrotech</title>
        <meta property="og:title" content="Cart" />
        <meta property="og:image" content="%PUBLIC_URL%/seo-main-image.png" />
      </Helmet>
      <Checkout />
    </motion.div>
  )
}

export default Cart
