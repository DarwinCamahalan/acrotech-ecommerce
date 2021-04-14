import React from 'react'
import './styles.scss'
import SignIn from '../../components/signin'
import { Helmet } from 'react-helmet'
import TypeEffect from '../../components/TypeEffect/TypeEffect'
const Login = (props) => {
  return (
    <div className="signin">
      <Helmet>
        <title>Login | Acrotech</title>
        <meta property="og:title" content="Login" />
        <meta property="og:image" content="%PUBLIC_URL%/seo-main-image.png" />
      </Helmet>
      <TypeEffect />
      <SignIn />
    </div>
  )
}

export default Login
