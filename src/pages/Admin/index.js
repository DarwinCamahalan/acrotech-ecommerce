import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
} from './../../redux/Products/products.actions'
import Modal from './../../components/Modal'
import FormInput from './../../components/forms/FormInput'
import FormSelect from './../../components/forms/FormSelect'
import Button from '../../components/forms/button'
import LoadMore from './../../components/LoadMore'
import CKEditor from 'ckeditor4-react'
import './styles.scss'
import { FaTrashAlt } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
const mapState = ({ productsData }) => ({
  products: productsData.products,
})

const Admin = (props) => {
  const { products } = useSelector(mapState)
  const dispatch = useDispatch()
  const [hideModal, setHideModal] = useState(true)
  const [productCategory, setProductCategory] = useState('equipments')
  const [productName, setProductName] = useState('')
  const [productThumbnail, setProductThumbnail] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [productDesc, setProductDesc] = useState('')

  const { data, queryDoc, isLastPage } = products

  useEffect(() => {
    dispatch(fetchProductsStart())
  }, [])

  const toggleModal = () => setHideModal(!hideModal)

  const configModal = {
    hideModal,
    toggleModal,
  }

  const resetForm = () => {
    setHideModal(true)
    setProductCategory('equipments')
    setProductName('')
    setProductThumbnail('')
    setProductPrice(0)
    setProductDesc('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
        productDesc,
      })
    )
    resetForm()
  }

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    )
  }

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  }

  return (
    <motion.div
      className="admin"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <Helmet>
        <title>Admin | Acrotech</title>
        <meta property="og:title" content="Admin" />
        <meta property="og:image" content="%PUBLIC_URL%/seo-main-image.png" />
      </Helmet>
      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>Add New Product</Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            <h2>Add New Product</h2>

            <FormSelect
              label="Category"
              options={[
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
              ]}
              handleChange={(e) => setProductCategory(e.target.value)}
            />

            <FormInput
              label="Name"
              type="text"
              value={productName}
              required
              handleChange={(e) => setProductName(e.target.value)}
            />

            <FormInput
              label="Product Image URL"
              type="url"
              value={productThumbnail}
              required
              handleChange={(e) => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label="Price"
              type="number"
              min="0"
              max="999999999"
              step="1"
              value={productPrice}
              required
              handleChange={(e) => setProductPrice(e.target.value)}
            />

            <CKEditor
              onChange={(evt) => setProductDesc(evt.editor.getData())}
            />

            <br />

            <Button type="submit">Add product</Button>
          </form>
        </div>
      </Modal>

      <div className="manageProducts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>Manage Products</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className="results"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    {Array.isArray(data) &&
                      data.length > 0 &&
                      data.map((product, index) => {
                        const {
                          productName,
                          productThumbnail,
                          productPrice,
                          documentID,
                        } = product

                        return (
                          <tr key={index}>
                            <td>
                              <img className="thumb" src={productThumbnail} />
                            </td>
                            <td>{productName}</td>
                            <td>₱{productPrice}</td>
                            <td>
                              <Button
                                onClick={() =>
                                  dispatch(deleteProductStart(documentID))
                                }
                              >
                                <FaTrashAlt />
                              </Button>
                            </td>
                            <td>
                              <Button
                              // onClick={() =>
                              //   dispatch(deleteProductStart(documentID))
                              // }
                              >
                                <MdEdit />
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>{!isLastPage && <LoadMore {...configLoadMore} />}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default Admin
