import Signup from '../../components/SignUp'
import './styles.scss'
import { Helmet } from 'react-helmet'
import TypeEffect from '../../components/TypeEffect/TypeEffect'
const Registration = (props) => {
  return (
    <div className="signup">
      <Helmet>
        <title>Sign Up | Acrotech</title>
        <meta property="og:title" content="Sign Up" />
        <meta property="og:image" content="%PUBLIC_URL%/seo-main-image.png" />
      </Helmet>
      <TypeEffect />
      <Signup />
    </div>
  )
}

export default Registration
