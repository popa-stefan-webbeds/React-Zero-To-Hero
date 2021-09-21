import PropTypes from 'prop-types'
import { useStyles } from '../Styles'
const Button = ({ color, text, onClick }) => {

    const classes = useStyles();
    return (
        <button
            onClick={onClick}
            style={{ backgroundColor: color }}
            className={classes.btn}>{text}</button>
    )
}

Button.defaultProps = {
    color: 'steelblue',
    text: 'Add'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string
}

export default Button
