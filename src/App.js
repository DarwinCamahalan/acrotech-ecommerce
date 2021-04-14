import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { checkUserSession } from './redux/User/user.actions'
import { css } from '@emotion/core'
import HashLoader from 'react-spinners/HashLoader'
import { AnimatePresence } from 'framer-motion'
import Logo from './assets/acrotech-logo-compress.png'
import ScrollToTop from './ScrollToTop'
// hoc
import WithAuth from './hoc/withAuth'
import WithAdminAuth from './hoc/withAdminAuth'

// layouts
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import DashboardLayout from './layouts/DashboardLayout'

// pages
import Search from './pages/Search'
import Registration from './pages/signup'
import Login from './pages/login'
import Recovery from './pages/Recovery'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import Order from './pages/Order'
import './default.scss'
import { Helmet } from 'react-helmet'

const override = css`
  display: block;
  margin: 22rem auto;
  opacity: 1;
`
const App = (props) => {
  const dispatch = useDispatch()

  setTimeout(() => {
    const loadingIcon = document.querySelector('.loading')
    loadingIcon.style.display = 'none'
  }, 5000)
  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

  return (
    <div className="App">
      <Helmet>
        <title>Acrotech</title>
        <meta property="og:title" content="Acrotech" />
        <meta property="og:image" content="%PUBLIC_URL%/seo-main-image.png" />
      </Helmet>
      <ScrollToTop />
      <div className="loading">
        <HashLoader color="#0072ff" css={override} size={100} />
        <img src={Logo} alt={Logo} />
      </div>
      <AnimatePresence exitBeforeEnter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <MainLayout>
                <Search />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <MainLayout>
                <Search />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/search/:filterType"
            render={() => (
              <MainLayout>
                <Search />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/product/:productID"
            render={() => (
              <MainLayout>
                <ProductDetails />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/cart"
            render={() => (
              <MainLayout>
                <Cart />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/payment"
            render={() => (
              <WithAuth>
                <MainLayout>
                  <Payment />
                </MainLayout>
              </WithAuth>
            )}
          />
          <Route
            exact
            path="/registration"
            render={() => (
              <MainLayout>
                <Registration />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <MainLayout>
                <Login />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/recovery"
            render={() => (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/dashboard"
            render={() => (
              <WithAuth>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </WithAuth>
            )}
          />
          <Route
            exact
            path="/order/:orderID"
            render={() => (
              <WithAuth>
                <DashboardLayout>
                  <Order />
                </DashboardLayout>
              </WithAuth>
            )}
          />
          <Route
            exact
            path="/admin"
            render={() => (
              <WithAdminAuth>
                <AdminLayout>
                  <Admin />
                </AdminLayout>
              </WithAdminAuth>
            )}
          />
        </Switch>
      </AnimatePresence>
    </div>
  )
}

export default App
