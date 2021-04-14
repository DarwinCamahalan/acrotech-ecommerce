import React from 'react'
import EmailPassword from './../../components/EmailPassword'
import './styles.scss'
import { Helmet } from 'react-helmet'
import TypeEffect from './../../components/TypeEffect/TypeEffect'
const Recovery = (props) => {
  return (
    <div className="recovery">
      <Helmet>
        <title>Recovery | Acrotech</title>
        <meta property="og:title" content="Forgot Password" />
        <meta property="og:image" content="%PUBLIC_URL%/seo-main-image.png" />
      </Helmet>
      <TypeEffect />
      <EmailPassword />
    </div>
  )
}

export default Recovery
