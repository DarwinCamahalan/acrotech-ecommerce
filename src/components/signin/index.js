import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {
  emailSignInStart,
  googleSignInStart,
} from '../../redux/User/user.actions'

import './styles.scss'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import AuthWrapper from '../AuthWrapper'
import { motion } from 'framer-motion'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
})

const SignIn = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser } = useSelector(mapState)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (currentUser) {
      resetForm()
      history.push('/')
    }
  }, [currentUser])

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(emailSignInStart({ email, password }))
  }

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart())
  }

  const configAuthWrapper = {
    headline: 'Log In',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -600 }}
      animate={{ opacity: 1, y: 4 }}
      exit={{ opacity: 1, y: 4 }}
    >
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap-login">
          <form onSubmit={handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              handleChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Log In</Button>

            <hr />
            <div className="socialSignin">
              <p className="or">OR</p>
              <div className="row">
                <Button
                  onClick={handleGoogleSignIn}
                  style={{
                    backgroundColor: '#363535',
                  }}
                >
                  <FcGoogle style={{ fontSize: '19px' }} /> Google
                </Button>
                <div style={{ width: '20px' }}></div>
                <Button onClick={handleGoogleSignIn}>
                  <FaFacebook
                    style={{ fontSize: '19px', marginRight: '5px' }}
                  />
                  Facebook
                </Button>
              </div>
            </div>
            <div className="links-login">
              <Link to="/registration">Sign Up</Link>
              {' | '}
              <Link to="/recovery">Reset Password</Link>
            </div>
          </form>
        </div>
      </AuthWrapper>
    </motion.div>
  )
}

export default SignIn
