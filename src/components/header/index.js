import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signOutUserStart } from '../../redux/User/user.actions'
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors'
import './styles.scss'

import Logo from './../../assets/acrotech-logo-compress.png'

import { IoCartOutline } from 'react-icons/io5'
import { ImKey2 } from 'react-icons/im'
import { TiArrowSortedDown } from 'react-icons/ti'
import { BsSearch } from 'react-icons/bs'
import { MdPayment, MdHistory } from 'react-icons/md'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { checkUserIsAdmin } from '../../Utils'
const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
})

const Header = (props) => {
  const [open, setOpen] = useState(false)
  const toggle = () => {
    setOpen(!open)
  }
  const showMenu = () => {
    setOpen(open)
  }

  const location = useLocation()
  const [activeMenu, setActiveMenu] = useState(false)
  const dispatch = useDispatch()
  const { currentUser, totalNumCartItems } = useSelector(mapState)
  if (currentUser) {
    var { displayName } = currentUser
  }
  const isAdmin = checkUserIsAdmin(currentUser)
  const signOut = () => {
    dispatch(signOutUserStart())
  }

  useEffect(() => {
    setActiveMenu(false)
  }, [location])

  return (
    <header className="header">
      {currentUser && (
        <div className="search-main">
          <div className="search">
            <input type="text" placeholder="Search in Acrotech" />{' '}
            <BsSearch className="search-icon-pc" />
          </div>
        </div>
      )}
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Acrotech Logo" />
          </Link>
        </div>

        <div className="callToActions">
          <ul>
            {currentUser && (
              <li>
                <div className="cart">
                  <Link to="/cart">
                    <IoCartOutline
                      style={{ fontSize: '40px', color: '#000' }}
                    />

                    {totalNumCartItems > 0 ? (
                      <div className="cart-number">{totalNumCartItems}</div>
                    ) : (
                      <div></div>
                    )}
                  </Link>
                </div>
              </li>
            )}

            {currentUser && [
              <li>
                <strong
                  onClick={toggle}
                  className="camel-case menu"
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {displayName} <TiArrowSortedDown size={18} />
                  {open ? (
                    <div
                      className="menus"
                      onMouseEnter={showMenu}
                      onMouseLeave={toggle}
                    >
                      {isAdmin && (
                        <div className="settings">
                          <Link to="/admin" style={{ color: '#ff0000' }}>
                            <ImKey2 className="icon" />
                            Admin Settings
                          </Link>
                        </div>
                      )}

                      <div className="settings">
                        <Link to="/payment">
                          <MdPayment className="icon" />
                          Payment
                        </Link>
                      </div>
                      <div className="settings">
                        <Link to="/dashboard">
                          <MdHistory className="icon" />
                          Order History
                        </Link>
                      </div>
                      <div className="settings">
                        <Link to="/cart">
                          <AiOutlineShoppingCart className="icon" />
                          Cart
                        </Link>
                      </div>
                      <div className="settings">
                        <Link onClick={() => signOut()}>
                          <RiLogoutBoxRLine className="icon" />
                          Log Out
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </strong>
              </li>,
            ]}

            {!currentUser && [
              <li key={1}>
                <Link to="/login">
                  <strong className="login-btn" style={{ color: '#fff' }}>
                    Log In
                  </strong>
                  <i class="fas fa-user-circle"></i>
                </Link>
              </li>,
            ]}

            <li className="mobileMenu">
              <span onClick={() => setActiveMenu(!activeMenu)}>
                <i className="fas fa-bars"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

Header.defaultProps = {
  currentUser: null,
}

export default Header
