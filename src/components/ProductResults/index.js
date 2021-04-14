import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { fetchProductsStart } from './../../redux/Products/products.actions'
import Product from './Product'
import FormSelect from './../forms/FormSelect'
import LoadMore from './../LoadMore'
import './styles.scss'

// CAROUSEL
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

//
const mapState = ({ productsData }) => ({
  products: productsData.products,
})

const ProductResults = ({}) => {
  const dispatch = useDispatch()

  const history = useHistory()
  const { filterType } = useParams()
  const { products } = useSelector(mapState)

  const { data, queryDoc, isLastPage } = products

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }))
  }, [filterType])

  const handleFilter = (e) => {
    const nextFilter = e.target.value
    history.push(`/search/${nextFilter}`)
  }

  if (!Array.isArray(data)) return null
  if (data.length < 1) {
    return (
      <div className="products">
        <img
          className="not-found"
          src="https://cdn.dribbble.com/users/774806/screenshots/3823110/something-went-wrong.gif"
          alt="No Products Found."
        />
      </div>
    )
  }

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: 'Sort By',
        value: '',
      },
      {
        name: 'Tools',
        value: 'tools',
      },

      {
        name: 'Machines',
        value: 'machines',
      },

      {
        name: 'Equipment',
        value: 'equipment',
      },

      {
        name: 'Cables',
        value: 'cables',
      },

      {
        name: 'Parts',
        value: 'parts',
      },

      {
        name: 'Valves',
        value: 'valves',
      },

      {
        name: 'Materials',
        value: 'materials',
      },
      {
        name: 'Others',
        value: 'others',
      },
    ],
    handleChange: handleFilter,
  }

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    )
  }

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  }

  return (
    <div className="products">
      <Carousel
        autoPlay
        interval="3000"
        showStatus={false}
        showThumbs={false}
        infiniteLoop
        className="slide"
      >
        <div>
          <img src="https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?cs=srgb&dl=pexels-bidvine-1249611.jpg&fm=jpg" />
        </div>
        <div>
          <img src="https://images.pexels.com/photos/38070/pexels-photo-38070.jpeg?cs=srgb&dl=pexels-skitterphoto-38070.jpg&fm=jpg" />
        </div>
        <div>
          <img src="https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg?cs=srgb&dl=pexels-photomix-company-224924.jpg&fm=jpg" />
        </div>

        <div>
          <img src="https://images.pexels.com/photos/4641061/pexels-photo-4641061.jpeg?cs=srgb&dl=pexels-igovar-4641061.jpg&fm=jpg" />
        </div>
        <div>
          <img src="https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?cs=srgb&dl=pexels-burst-544966.jpg&fm=jpg" />
        </div>
      </Carousel>
      <FormSelect {...configFilters} />

      <div className="productResults">
        {data.map((product, pos) => {
          const { productThumbnail, productName, productPrice } = product
          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === 'undefined'
          )
            return null

          const configProduct = {
            ...product,
          }

          return <Product key={pos} {...configProduct} />
        })}
      </div>

      {!isLastPage && <LoadMore {...configLoadMore} />}
    </div>
  )
}

export default ProductResults
