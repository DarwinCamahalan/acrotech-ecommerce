import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectCartItems,
  selectCartTotal,
} from './../../redux/Cart/cart.selectors'
import { createStructuredSelector } from 'reselect'
import './styles.scss'
import Button from '../forms/button'
import Item from './Item'
import { motion } from 'framer-motion'
const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
})

const Checkout = ({}) => {
  const history = useHistory()
  const { cartItems, total } = useSelector(mapState)

  const errMsg = 'no item in cart'

  return (
    <div className="main-checkout">
      <motion.div
        initial={{ opacity: 0, x: -600 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 1, x: 0 }}
        className="checkout"
      >
        <h1 style={{ display: 'flex', marginLeft: '2rem' }}>Cart</h1>

        <div className="cart">
          {cartItems.length > 0 ? (
            <table border="0" cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td>
                    <table
                      className="checkoutHeader"
                      border="0"
                      cellPadding="10"
                      cellSpacing="0"
                    >
                      <tbody>
                        <tr>
                          <th>Product</th>
                          <th>Description</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Remove</th>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table border="0" cellSpacing="0" cellPadding="0">
                      <tbody>
                        {cartItems.map((item, pos) => {
                          return (
                            <tr key={pos}>
                              <td>
                                <Item {...item} />
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table border="0" cellSpacing="0" cellPadding="0">
                      <tbody>
                        <tr>
                          <td>
                            <table border="0" cellPadding="10" cellSpacing="0">
                              <tbody>
                                <tr>
                                  <td>
                                    <h3
                                      style={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        color: '#0055ff',
                                      }}
                                    >
                                      <span
                                        style={{
                                          color: '#000',
                                        }}
                                      >
                                        Total:{' '}
                                      </span>{' '}
                                      <span
                                        style={{
                                          color: '#0055ff',
                                          fontSize: '27px',
                                        }}
                                      >
                                        ₱
                                      </span>{' '}
                                      {total}
                                    </h3>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table border="0" cellPadding="10" cellSpacing="0">
                              <tbody>
                                <tr>
                                  <td>
                                    <Button onClick={() => history.push('/')}>
                                      Continue Shopping
                                    </Button>
                                  </td>
                                  <td>
                                    <Button
                                      onClick={() => history.push('/payment')}
                                    >
                                      Checkout
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="no-item">
              <div className="err">{errMsg}</div>
              <img
                style={{ width: '50%' }}
                src="https://cdn.dribbble.com/users/204955/screenshots/4930541/emptycart.png"
                alt="No Items"
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default Checkout
