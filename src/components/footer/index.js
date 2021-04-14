import './styles.scss'
import { Link } from 'react-router-dom'
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="wrap-footer1">
        <h4 style={{ fontWeight: '400' }}>
          &copy; Acrotech {new Date().getFullYear()}
        </h4>

        <a>
          <FaLinkedin fontSize="20" color="#0e76a8" />
          <span>LinkedIn</span>
        </a>
        <a>
          <FaFacebook fontSize="20" color="#3b5998" />
          <span>Facebook</span>
        </a>
        <a>
          <FaTwitter fontSize="20" color="#00acee" />
          <span> Twitter</span>
        </a>
      </div>
      <div className="wrap-footer2">
        <h4> Contact Us </h4>
        <span>Email:</span>
        <a href="mailto:acrotech@gmail.com" target="_blank">
          acrotech@gmail.com
        </a>

        <h5>Our Developer:</h5>
        <span>LinkedIn:</span>
        <a
          href="https://www.linkedin.com/in/darwin-camahalan-8395201b5/"
          target="_blank"
        >
          Darwin Camahalan
        </a>
        <span>GitHub:</span>
        <a href="https://github.com/DarwinCamahalan" target="_blank">
          Darwin Camahalan
        </a>
        <span>Facebook:</span>
        <a href="https://www.facebook.com/darpax101/" target="_blank">
          Darwin
        </a>
        <span>Phone number:</span>
        <a>+639754270609</a>
      </div>
      <div className="wrap-footer3">
        <h4> All Links</h4>
        <Link to="/">Homepage</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/payment">Payment</Link>
        <Link to="/dashboard">Order History</Link>
        <Link to="/login">Login</Link>
        <Link to="/registration">Sign Up</Link>
        <Link to="/recovery">Recovery</Link>
      </div>
      <div className="wrap-footer4">
        <h4>Sponsors</h4>
        <p>Student Project</p>
        <p>
          University of Science and <br />
          Technology
        </p>
        <p>
          Software Design & <br />
          Engineering Students
        </p>
      </div>
    </footer>
  )
}

export default Footer
