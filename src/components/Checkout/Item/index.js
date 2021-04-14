import React from 'react'
import { useDispatch } from 'react-redux'
import {
  removeCartItem,
  addProduct,
  reduceCartItem,
} from './../../../redux/Cart/cart.actions'
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai'
import { FaTrashAlt } from 'react-icons/fa'
import './styles.scss'
const Item = (product) => {
  const dispatch = useDispatch()
  const {
    productName,
    productThumbnail,
    productPrice,
    quantity,
    documentID,
  } = product

  const handleRemoveCartItem = (documentID) => {
    dispatch(
      removeCartItem({
        documentID,
      })
    )
  }

  const handleAddProduct = (product) => {
    dispatch(addProduct(product))
  }

  const handleReduceItem = (product) => {
    dispatch(reduceCartItem(product))
  }

  return (
    <table className="cartItem" border="0" cellSpacing="0" cellPadding="10">
      <tbody>
        <tr>
          <td>
            <img src={productThumbnail} alt={productName} />
          </td>
          <td>{productName}</td>
          <td>
            <div className="qty">
              <span
                className="cartBtn"
                onClick={() => handleReduceItem(product)}
              >
                <AiOutlineMinusSquare style={{ fontSize: '25px' }} />
              </span>
              <span>{quantity}</span>
              <span
                className="cartBtn"
                onClick={() => handleAddProduct(product)}
              >
                <AiOutlinePlusSquare style={{ fontSize: '25px' }} />
              </span>
            </div>
          </td>
          <td>₱{productPrice}</td>
          <td align="center">
            <span
              className="cartBtn remove"
              onClick={() => handleRemoveCartItem(documentID)}
            >
              <FaTrashAlt style={{ fontSize: '25px', color: '#ff0000' }} />
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Item
