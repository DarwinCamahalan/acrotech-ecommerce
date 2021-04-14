import React, { useEffect, useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProductStart,
  setProduct,
} from './../../redux/Products/products.actions'
import ReactImageZoom from 'react-image-zoom'
import { FaCheck } from 'react-icons/fa'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'

import { addProduct } from './../../redux/Cart/cart.actions'
import Button from './../forms/Button'
import './styles.scss'
import { motion } from 'framer-motion'
import Tilt from 'react-tilt'
const mapState = (state) => ({
  product: state.productsData.product,
  currentUser: state.user.currentUser,
})

const ProductCard = ({}) => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(mapState)
  const history = useHistory()
  const { productID } = useParams()
  const { product } = useSelector(mapState)

  const { productThumbnail, productName, productPrice, productDesc } = product
  const props = {
    width: 450,
    zoomWidth: 450,
    zoomLensStyle: 500,
    img: `${productThumbnail}`,
  }
  useEffect(() => {
    dispatch(fetchProductStart(productID))

    return () => {
      dispatch(setProduct({}))
    }
  }, [])
  const [popup, setPopup] = useState(false)
  const handleAddToCart = (product) => {
    if (currentUser) {
      if (!product) return
      dispatch(addProduct(product))
      setPopup(!popup)
      setTimeout(() => {
        setPopup(popup)
      }, 3000)
    } else {
      history.push('/login')
    }
  }
  const [check, setCheck] = useState(false)
  const isCheck = () => {
    setCheck(!check)
  }
  const configAddToCartBtn = {
    type: 'button',
  }

  return (
    <div className="main-card">
      {popup ? (
        <div id="added-details">
          <span>
            Item Successfully Added{' '}
            <FaCheck style={{ marginLeft: '10px', fontSize: '18px' }} />
          </span>
        </div>
      ) : (
        <div></div>
      )}
      <motion.div
        initial={{ opacity: 0, y: -600 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 1, y: 0 }}
        className="productCard"
      >
        <div className="hero">
          <div className="switch-frame" onClick={isCheck}>
            <p style={{ marginRight: '10px', fontFamily: 'Open sans' }}>
              3D Image
            </p>
            {check ? (
              <BsToggleOn style={{ fontSize: '32px', color: '#0B6CFF' }} />
            ) : (
              <BsToggleOff style={{ fontSize: '32px', color: '#f64f59' }} />
            )}
          </div>

          <div className="zoom-pc">
            {check ? (
              <Tilt>
                <img
                  src={productThumbnail}
                  alt={productThumbnail}
                  className="three-d"
                />
              </Tilt>
            ) : (
              <div>
                <ReactImageZoom {...props} zoomPosition="original" />
              </div>
            )}
          </div>
          <div className="zoom-phone">
            {' '}
            <img src={productThumbnail} alt={productThumbnail} />
          </div>
        </div>
        <div className="productDetails">
          <ul>
            <li>
              <h1>{productName}</h1>
            </li>
            <li className="price">
              <span style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {' '}
                <span style={{ color: '#0055ff', fontSize: '30px' }}>
                  ₱
                </span>{' '}
                {productPrice}
              </span>
            </li>
            <li>
              <div className="addToCart">
                <Button
                  {...configAddToCartBtn}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </Button>
                <div style={{ margin: '0 5px' }}></div>
                <Button
                  {...configAddToCartBtn}
                  onClick={() => handleAddToCart(product)}
                >
                  <Link to="/payment" style={{ padding: '1rem 2rem' }}>
                    Buy Now
                  </Link>
                </Button>
              </div>
            </li>
            <li>
              <span
                className="desc"
                dangerouslySetInnerHTML={{ __html: productDesc }}
              />
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

export default ProductCard
