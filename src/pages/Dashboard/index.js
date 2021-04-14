import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrderHistory } from './../../redux/Orders/orders.actions'
import OrderHistory from './../../components/OrderHistory'
import './styles.scss'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
})

const Dashboard = (props) => {
  const dispatch = useDispatch()
  const { currentUser, orderHistory } = useSelector(mapState)

  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <Helmet>
        <title>Order History | Acrotech</title>
        <meta property="og:title" content="Order History" />
        <meta property="og:image" content="%PUBLIC_URL%/seo-main-image.png" />
      </Helmet>
      <h1>Order History</h1>

      <OrderHistory orders={orderHistory} />
    </motion.div>
  )
}

export default Dashboard
