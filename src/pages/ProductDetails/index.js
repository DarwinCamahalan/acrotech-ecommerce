import React from 'react'
import ProductCard from './../../components/ProductCard'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
const ProductDetails = ({}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <Helmet>
        <title>Product Details | Acrotech</title>
        <meta property="og:title" content="Product Details" />
        <meta property="og:image" content="%PUBLIC_URL%/seo-main-image.png" />
      </Helmet>
      <ProductCard />
    </motion.div>
  )
}

export default ProductDetails
