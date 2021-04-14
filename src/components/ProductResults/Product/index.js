import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from './../../../redux/Cart/cart.actions'
import './styles.scss'
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles'
import { FaCheck } from 'react-icons/fa'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { motion } from 'framer-motion'
import ReactStars from 'react-rating-stars-component'

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
})
const mapState = (state) => ({
  currentUser: state.user.currentUser,
})

const Product = (product) => {
  const { currentUser } = useSelector(mapState)
  const history = useHistory()
  const classes = useStyles()
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
  const [rating, setRating] = useState(0)
  const stars = {
    size: 20,
    value: 2.5,
    activeColor: '#ffd700',
    onChange: (newValue) => {
      setRating(newValue)
    },
  }

  const dispatch = useDispatch()
  const { documentID, productThumbnail, productName, productPrice } = product
  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === 'undefined'
  )
    return null

  const configAddToCartBtn = {
    type: 'button',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      className="cards"
    >
      {popup ? (
        <div id="added">
          <span>
            Successfully Added
            <FaCheck style={{ marginLeft: '10px', fontSize: '15px' }} />
          </span>
        </div>
      ) : (
        <div></div>
      )}
      <Card id="card" className={classes.root}>
        <CardActionArea>
          <Link to={`/product/${documentID}`}>
            <CardMedia
              component="img"
              object-fit
              alt={productName}
              width
              height="150"
              image={productThumbnail}
              title={productName}
            />
          </Link>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h5"
              className="camel-case"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontFamily: 'Montserrat',
                fontWeight: '600',
              }}
            >
              {productName}
            </Typography>
            <ReactStars className="stars" {...stars} />,
            <Typography
              variant="h5"
              color="textPrimary"
              component="h5"
              style={{
                color: '#0055ff',
                fontSize: '20px',
                fontFamily: 'Roboto',
              }}
            >
              ₱ {productPrice}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Button
            className="btn-add-cart"
            {...configAddToCartBtn}
            onClick={() => handleAddToCart(product)}
          >
            <strong style={{ fontSize: '11px' }}>Add to cart</strong>
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  )
}

export default Product
