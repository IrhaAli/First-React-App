import PropTypes from 'prop-types'


const Button = ({ color, text, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        style={{ backgroundColor: color }}
        className="btn">
        {text}
      </button>
    </div>
  )
}
Button.defaultProps = {
  color: 'steelblue',
  text: 'I\'m Useless'
}

// To indicate what type of input text and color should be
Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
