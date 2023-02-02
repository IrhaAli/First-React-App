import Button from "./Button"

const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color={showAdd ? 'red' : 'black'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />
    </header>
  )
}

// Default value when nothing is providedfor title
Header.defaultProps = {
  title: 'Task Tracker',
}

// How to apply css in js
/* const headingStyle = { color: 'red', backgroundColor: 'blue'} */

export default Header
