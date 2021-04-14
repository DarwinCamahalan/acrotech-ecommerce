import ReactTypingEffect from 'react-typing-effect'
import './styles.scss'

const TypeEffect = () => {
  return (
    <div className="type-frame">
      <div className="text">
        <div className="acro-img">
          <img
            src={process.env.PUBLIC_URL + 'favicon.png'}
            alt="acrotech logo"
          />
          <span>Acrotech</span>
        </div>

        <br />
        <span>
          Are you looking for? {'    '}
          <ReactTypingEffect
            text={[
              'Equipments.',
              'Tools.',
              'Machines.',
              'Materials.',
              'Much more.',
            ]}
            className="type"
            speed="100"
            eraseSpeed="100"
            eraseDelay="700"
            typingDelay="700"
          />
          <br />
          in <span className="acrotech">Acrotech</span> we have it all for you.
        </span>
      </div>
    </div>
  )
}

export default TypeEffect
